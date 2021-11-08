const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      _id: Joi.string()
        .min(24)
        .max(24)
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    });

    const { error } = await schema.validate(req.params, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    const err = [];
    const { details } = error;
    details.forEach((e) => {
      err.push({
        description: e.path[0],
        name: e.message
      });
    });
    return res.status(400).json(err);
  }
};
