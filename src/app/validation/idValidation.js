const Joi = require('joi');
const { idPattern } = require('../utils/regexPatterns');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      _id: Joi.string().regex(idPattern()).required()
    });

    const { error } = await schema.validate(req.params, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(
      error.details.map((detail) => ({
        name: detail.path.join('.'),
        description: detail.message
      }))
    );
  }
};
