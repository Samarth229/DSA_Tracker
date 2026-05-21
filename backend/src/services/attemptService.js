const { query } = require('../config/database');
const { recalculateStrength } = require('./strengthCalculationService');

async function logAttempt(userId, data) {
  const { topic_id, difficulty_selected, attempt_status, time_taken, ai_service, notes, questions_received } = data;

  const { rows } = await query(
    `INSERT INTO topic_attempts
       (user_id, topic_id, difficulty_selected, attempt_status, time_taken,
        ai_service, notes, questions_received, timestamp_logged)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,NOW())
     RETURNING *`,
    [userId, topic_id, difficulty_selected, attempt_status, time_taken || null, ai_service || null, notes || null, questions_received || null]
  );

  await recalculateStrength(userId, topic_id);

  return rows[0];
}

async function getUserAttempts(userId, topicId) {
  const params = [userId];
  let sql = `
    SELECT ta.*, t.name as topic_name, t.slug as topic_slug
    FROM topic_attempts ta
    JOIN topics t ON t.id = ta.topic_id
    WHERE ta.user_id = $1
  `;
  if (topicId) {
    sql += ' AND ta.topic_id = $2';
    params.push(topicId);
  }
  sql += ' ORDER BY ta.timestamp_started DESC';

  const { rows } = await query(sql, params);
  return rows;
}

module.exports = { logAttempt, getUserAttempts };
