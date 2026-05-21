const { body, validationResult } = require('express-validator');

const resetRules = [
  body('confirmation')
    .trim()
    .notEmpty().withMessage('Confirmation text is required')
    .equals('RESET').withMessage('Must type exactly "RESET" to confirm'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = { resetRules, validate };
