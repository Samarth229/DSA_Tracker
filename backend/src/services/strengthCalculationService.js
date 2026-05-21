const { query } = require('../config/database');

function computeMasteryLevel(solved, attempted) {
  if (attempted === 0) return 'not_started';
  const accuracy = (solved / attempted) * 100;
  if (accuracy >= 80 && attempted >= 5) return 'mastered';
  if (accuracy >= 60 && attempted >= 3) return 'confident';
  return 'learning';
}

async function recalculateStrength(userId, topicId) {
  const { rows } = await query(
    `SELECT attempt_status, time_taken
     FROM topic_attempts
     WHERE user_id = $1 AND topic_id = $2`,
    [userId, topicId]
  );

  const attempted = rows.length;
  const solved = rows.filter((r) => r.attempt_status === 'solved').length;
  const timings = rows.map((r) => r.time_taken).filter(Boolean);
  const avg_time_taken = timings.length > 0 ? Math.round(timings.reduce((a, b) => a + b, 0) / timings.length) : null;
  const accuracy = attempted > 0 ? parseFloat(((solved / attempted) * 100).toFixed(2)) : null;
  const mastery_level = computeMasteryLevel(solved, attempted);
  const is_weak_topic = attempted >= 2 && accuracy !== null && accuracy < 50;

  await query(
    `INSERT INTO user_topic_strength
       (user_id, topic_id, solved_count, attempted_count, accuracy, avg_time_taken,
        last_practiced, is_weak_topic, mastery_level)
     VALUES ($1,$2,$3,$4,$5,$6,NOW(),$7,$8)
     ON CONFLICT (user_id, topic_id) DO UPDATE SET
       solved_count = EXCLUDED.solved_count,
       attempted_count = EXCLUDED.attempted_count,
       accuracy = EXCLUDED.accuracy,
       avg_time_taken = EXCLUDED.avg_time_taken,
       last_practiced = NOW(),
       is_weak_topic = EXCLUDED.is_weak_topic,
       mastery_level = EXCLUDED.mastery_level`,
    [userId, topicId, solved, attempted, accuracy, avg_time_taken, is_weak_topic, mastery_level]
  );
}

module.exports = { recalculateStrength };
