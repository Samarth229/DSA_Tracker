const router = require('express').Router();
const { logAttempt, getAttempts } = require('../controllers/attemptController');
const { logAttemptRules, validate } = require('../validators/attemptValidator');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', logAttemptRules, validate, logAttempt);
router.get('/', getAttempts);

module.exports = router;
