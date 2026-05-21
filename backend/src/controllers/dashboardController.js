const { query } = require('../config/database');

const getDashboard = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [overallStats, topicStrengths, recentAttempts] = await Promise.all([
      query(
        `SELECT
           COUNT(*) FILTER (WHERE attempt_status = 'solved') AS total_solved,
           COUNT(*) FILTER (WHERE attempt_status = 'attempted') AS total_attempted,
           COUNT(DISTINCT topic_id) AS topics_touched
         FROM topic_attempts WHERE user_id = $1`,
        [userId]
      ),
      query(
        `SELECT uts.*, t.name AS topic_name, t.slug AS topic_slug, t.tier
         FROM user_topic_strength uts
         JOIN topics t ON t.id = uts.topic_id
         WHERE uts.user_id = $1
         ORDER BY uts.last_practiced DESC`,
        [userId]
      ),
      query(
        `SELECT ta.*, t.name AS topic_name, t.slug AS topic_slug
         FROM topic_attempts ta
         JOIN topics t ON t.id = ta.topic_id
         WHERE ta.user_id = $1
         ORDER BY ta.timestamp_started DESC
         LIMIT 10`,
        [userId]
      ),
    ]);

    const weakTopics = topicStrengths.rows.filter((t) => t.is_weak_topic);

    res.json({
      stats: overallStats.rows[0],
      topic_strengths: topicStrengths.rows,
      weak_topics: weakTopics,
      recent_attempts: recentAttempts.rows,
    });
  } catch (err) {
    next(err);
  }
};

const getTopicStrength = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const { rows: topics } = await query('SELECT id FROM topics WHERE slug = $1', [slug]);
    if (topics.length === 0) return res.status(404).json({ error: 'Topic not found' });

    const { rows } = await query(
      `SELECT * FROM user_topic_strength WHERE user_id = $1 AND topic_id = $2`,
      [req.user.id, topics[0].id]
    );

    res.json(rows[0] || null);
  } catch (err) {
    next(err);
  }
};

module.exports = { getDashboard, getTopicStrength };
