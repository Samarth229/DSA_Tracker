const { query, getClient } = require('../config/database');
const logger = require('../config/logger');

const resetProgress = async (req, res, next) => {
  try {
    const { confirmation } = req.body;
    const userId = req.user.id;

    if (confirmation !== 'RESET') {
      return res.status(400).json({ error: 'Invalid confirmation. Please type "RESET" exactly.' });
    }

    const client = await getClient();
    try {
      await client.query('BEGIN');

      await client.query(
        `INSERT INTO audit_logs (user_id, action, resource_type, metadata)
         VALUES ($1, 'reset_progress', 'user_progress', $2)`,
        [userId, JSON.stringify({ timestamp: new Date().toISOString(), ip: req.ip })]
      );

      const deleteAttempts = await client.query(
        'DELETE FROM topic_attempts WHERE user_id = $1 RETURNING id',
        [userId]
      );

      const deleteStrength = await client.query(
        'DELETE FROM user_topic_strength WHERE user_id = $1 RETURNING id',
        [userId]
      );

      await client.query(
        'UPDATE users SET streak_count = 0, last_activity_date = NULL WHERE id = $1',
        [userId]
      );

      await client.query('COMMIT');

      logger.info(
        { userId, attempts: deleteAttempts.rowCount, strength: deleteStrength.rowCount },
        'User reset progress'
      );

      res.json({
        success: true,
        message: 'Your progress has been completely reset.',
        deleted_attempts: deleteAttempts.rowCount,
        deleted_strength_records: deleteStrength.rowCount,
        reset_timestamp: new Date().toISOString(),
      });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    next(err);
  }
};

const getResetStatus = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [attempts, topics, user] = await Promise.all([
      query('SELECT COUNT(*) AS count FROM topic_attempts WHERE user_id = $1', [userId]),
      query('SELECT COUNT(*) AS count FROM user_topic_strength WHERE user_id = $1', [userId]),
      query('SELECT streak_count, last_activity_date FROM users WHERE id = $1', [userId]),
    ]);

    res.json({
      total_attempts: parseInt(attempts.rows[0].count),
      topics_practiced: parseInt(topics.rows[0].count),
      current_streak: user.rows[0]?.streak_count || 0,
      last_activity: user.rows[0]?.last_activity_date,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { resetProgress, getResetStatus };
