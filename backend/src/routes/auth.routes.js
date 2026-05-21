const router = require('express').Router();
const { register, login, getProfile } = require('../controllers/authController');
const { registerRules, loginRules, validate } = require('../validators/authValidator');
const authMiddleware = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, registerRules, validate, register);
router.post('/login', authLimiter, loginRules, validate, login);
router.get('/me', authMiddleware, getProfile);

module.exports = router;
