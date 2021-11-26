const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_user: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      data_inicio: Joi.date().format('DD/MM/YYYY').required(),
      data_fim: Joi.date().format('DD/MM/YYYY').required(),
      id_carro: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      id_locadora: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      valor_final: Joi.number().required()
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
