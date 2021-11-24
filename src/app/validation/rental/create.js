const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().required(),
      cnpj: Joi.string()
        .pattern(new RegExp(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/))
        .required(),
      atividades: Joi.string().trim().required(),
      endereco: Joi.array().min(1).items({
        cep: Joi.string().trim().required(),
        number: Joi.number().required(),
        isFilial: Joi.boolean().required()
      })
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
