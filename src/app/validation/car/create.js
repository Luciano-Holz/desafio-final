const Joi = require('joi');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      modelo: Joi.string().trim().required(),
      cor: Joi.string().trim().required(),
      ano: Joi.number().integer().min(1950).max(2022).required(),
      acessorios: Joi.array().min(1).items({ descricao: Joi.string().trim().required() }).unique(),
      quantidadePassageiros: Joi.number().required()
    });

    const { error } = await schema.validate(req.body, { abortEarly: false });
    if (error) throw error;
    return next();
  } catch (error) {
    return res.status(400).json(
      error.details.map((detail) => ({
        description: detail.message,
        name: detail.path.join('.')
      }))
    );
  }
};
