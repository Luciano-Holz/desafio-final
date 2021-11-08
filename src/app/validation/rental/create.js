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
        number: Joi.string().trim().required(),
        isFilial: Joi.boolean().required()
      })
    });

    const { error } = await schema.validate(req.body, { abortEarly: true });
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
