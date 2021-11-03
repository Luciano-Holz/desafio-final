const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      modelo: Joi.string().trim().required(),
      cor: Joi.string().trim().required(),
      ano: Joi.number().integer().min(1950).max(2022).required(),
      acessorios: Joi.array().items({ descricao: Joi.string().trim().required() }).unique(),
      quantidadePassageiros: Joi.number().required()
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
