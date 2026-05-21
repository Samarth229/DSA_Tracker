const pino = require('pino');
const { config } = require('./env');

const logger = pino({
  level: config.logLevel,
  transport:
    config.nodeEnv !== 'production'
      ? { target: 'pino-pretty', options: { colorize: true } }
      : undefined,
});

module.exports = logger;
