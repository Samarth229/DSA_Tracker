const logger = require('../config/logger');

const errorHandler = (err, req, res, next) => {
  logger.error({ err, url: req.url, method: req.method }, 'Unhandled error');

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === '23505') {
    return res.status(409).json({ error: 'Resource already exists' });
  }

  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Internal server error'
      : err.message;

  res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;
