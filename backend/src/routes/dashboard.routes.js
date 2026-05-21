const router = require('express').Router();
const { getDashboard, getTopicStrength } = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/', getDashboard);
router.get('/topic-strength/:slug', getTopicStrength);

module.exports = router;
