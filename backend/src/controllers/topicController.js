const topicService = require('../services/topicService');

const getAllTopics = async (req, res, next) => {
  try {
    const topics = await topicService.getAllTopics();
    res.json(topics);
  } catch (err) {
    next(err);
  }
};

const getTopicBySlug = async (req, res, next) => {
  try {
    const topic = await topicService.getTopicBySlug(req.params.slug);
    res.json(topic);
  } catch (err) {
    next(err);
  }
};

const getPrompt = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { difficulty = 'medium' } = req.query;
    const topic = await topicService.getTopicById(id);
    const prompt = await topicService.getPromptForTopic(id, difficulty);
    if (!prompt) {
      return res.status(404).json({ error: 'No prompt found for this topic and difficulty' });
    }
    res.json({ topic: { id: topic.id, name: topic.name }, prompt });
  } catch (err) {
    next(err);
  }
};

const getLeetCodeQuestions = async (req, res, next) => {
  try {
    const questions = await topicService.getLeetCodeQuestions(req.params.slug);
    res.json(questions);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllTopics, getTopicBySlug, getPrompt, getLeetCodeQuestions };
