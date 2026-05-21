const { query } = require('../config/database');

async function getAllTopics() {
  const { rows } = await query(
    `SELECT id, name, slug, tier, simple_definition, real_world_uses,
            prerequisites, order_in_sequence, difficulty_rating, estimated_hours,
            display_number
     FROM topics
     ORDER BY order_in_sequence ASC`
  );
  return rows;
}

async function getTopicBySlug(slug) {
  const { rows } = await query(
    `SELECT id, name, slug, tier, simple_definition, real_world_uses,
            prerequisites, order_in_sequence, difficulty_rating, estimated_hours,
            youtube_search_query, reference_url, display_number,
            diagram_svg, diagram_description
     FROM topics WHERE slug = $1`,
    [slug]
  );
  if (rows.length === 0) {
    const err = new Error('Topic not found');
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
}

async function getLeetCodeQuestions(slug) {
  const topicRes = await query('SELECT id FROM topics WHERE slug = $1', [slug]);
  if (!topicRes.rows[0]) {
    const err = new Error('Topic not found');
    err.statusCode = 404;
    throw err;
  }
  const topicId = topicRes.rows[0].id;
  const { rows } = await query(
    `SELECT id, difficulty, title, link, problem_number
     FROM leetcode_questions
     WHERE topic_id = $1
     ORDER BY
       CASE difficulty WHEN 'easy' THEN 1 WHEN 'medium' THEN 2 WHEN 'hard' THEN 3 END,
       problem_number ASC NULLS LAST`,
    [topicId]
  );
  return rows;
}

async function getTopicById(id) {
  const { rows } = await query(
    `SELECT id, name, slug, tier, simple_definition, real_world_uses,
            prerequisites, order_in_sequence, difficulty_rating, estimated_hours,
            youtube_search_query
     FROM topics WHERE id = $1`,
    [id]
  );
  if (rows.length === 0) {
    const err = new Error('Topic not found');
    err.statusCode = 404;
    throw err;
  }
  return rows[0];
}

async function getPromptForTopic(topicId, difficulty) {
  const { rows } = await query(
    `SELECT template_text, focus_area, version
     FROM prompt_templates
     WHERE topic_id = $1 AND difficulty = $2 AND is_active = TRUE
     LIMIT 1`,
    [topicId, difficulty]
  );
  return rows[0] || null;
}

module.exports = { getAllTopics, getTopicBySlug, getTopicById, getPromptForTopic, getLeetCodeQuestions };
