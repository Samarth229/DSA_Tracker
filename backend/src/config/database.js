const { Pool } = require('pg');
const { config } = require('./env');
const logger = require('./logger');

const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('error', (err) => {
  logger.error({ err }, 'Unexpected database pool error');
});

const query = async (text, params) => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (config.nodeEnv === 'development') {
    logger.debug({ query: text, duration, rows: res.rowCount }, 'DB query executed');
  }
  return res;
};

const getClient = () => pool.connect();

module.exports = { query, getClient, pool };
