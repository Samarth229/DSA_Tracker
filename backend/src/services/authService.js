const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('../config/database');
const { config } = require('../config/env');

async function register(email, password) {
  const exists = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (exists.rows.length > 0) {
    const err = new Error('Email already in use');
    err.statusCode = 409;
    throw err;
  }

  const password_hash = await bcrypt.hash(password, 12);
  const { rows } = await query(
    `INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email, created_at`,
    [email, password_hash]
  );

  const user = rows[0];
  const token = signToken(user);
  return { user, token };
}

async function login(email, password) {
  const { rows } = await query(
    'SELECT id, email, password_hash, created_at FROM users WHERE email = $1 AND deleted_at IS NULL',
    [email]
  );

  if (rows.length === 0) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  const user = rows[0];
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    const err = new Error('Invalid email or password');
    err.statusCode = 401;
    throw err;
  }

  await query('UPDATE users SET last_login = NOW() WHERE id = $1', [user.id]);

  const token = signToken(user);
  return { user: { id: user.id, email: user.email, created_at: user.created_at }, token };
}

async function getProfile(userId) {
  const { rows } = await query(
    'SELECT id, email, created_at, last_login, streak_count FROM users WHERE id = $1 AND deleted_at IS NULL',
    [userId]
  );
  if (rows.length === 0) {
    const err = new Error('User not found');
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
}

function signToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

module.exports = { register, login, getProfile };
