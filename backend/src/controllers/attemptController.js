const attemptService = require('../services/attemptService');

const logAttempt = async (req, res, next) => {
  try {
    const attempt = await attemptService.logAttempt(req.user.id, req.body);
    res.status(201).json(attempt);
  } catch (err) {
    next(err);
  }
};

const getAttempts = async (req, res, next) => {
  try {
    const topicId = req.query.topic_id || null;
    const attempts = await attemptService.getUserAttempts(req.user.id, topicId);
    res.json(attempts);
  } catch (err) {
    next(err);
  }
};

module.exports = { logAttempt, getAttempts };
