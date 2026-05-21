const router = require('express').Router();
const { resetProgress, getResetStatus } = require('../controllers/userManagementController');
const { resetRules, validate } = require('../validators/userValidator');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/reset-status', getResetStatus);
router.post('/reset-progress', resetRules, validate, resetProgress);

module.exports = router;
