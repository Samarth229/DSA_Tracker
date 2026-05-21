const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { config } = require('./config/env');
const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const { generalLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/auth.routes');
const topicRoutes = require('./routes/topics.routes');
const attemptRoutes = require('./routes/attempts.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const userManagementRoutes = require('./routes/userManagement.routes');

const app = express();

app.use(helmet());
app.use(cors({ origin: config.corsOrigin, credentials: true }));
app.use(express.json());
app.use(generalLimiter);

app.get('/health', (req, res) => res.json({ status: 'ok', env: config.nodeEnv }));

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/user', userManagementRoutes);

app.use((req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);

if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    logger.info(`Server running on port ${config.port} [${config.nodeEnv}]`);
  });
}

module.exports = app;
