const router = require('express').Router();
const { getAllTopics, getTopicBySlug, getPrompt, getLeetCodeQuestions } = require('../controllers/topicController');
const authMiddleware = require('../middleware/auth');

router.get('/', getAllTopics);
router.get('/:slug', getTopicBySlug);
router.get('/:id/prompt', authMiddleware, getPrompt);
router.get('/:slug/leetcode-questions', getLeetCodeQuestions);

module.exports = router;
