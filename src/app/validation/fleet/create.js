const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_carro: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      id_locadora: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      status: Joi.string().trim().required(),
      valor_diaria: Joi.number().required(),
      placa: Joi.string().trim().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
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
