const { body, validationResult } = require('express-validator');

const logAttemptRules = [
  body('topic_id').isUUID().withMessage('Valid topic_id required'),
  body('difficulty_selected')
    .isIn(['easy', 'medium', 'hard'])
    .withMessage('difficulty_selected must be easy, medium, or hard'),
  body('attempt_status')
    .isIn(['solved', 'attempted', 'skipped'])
    .withMessage('attempt_status must be solved, attempted, or skipped'),
  body('time_taken').optional().isInt({ min: 1 }).withMessage('time_taken must be a positive integer (minutes)'),
  body('ai_service').optional().isIn(['claude', 'chatgpt', 'other']),
  body('notes').optional().isString().isLength({ max: 2000 }),
  body('questions_received').optional().isString().isLength({ max: 5000 }),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { logAttemptRules, validate };
