
const Joi = require('joi');

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            nome: Joi.string()
                .required(),
            cpf: Joi.string()
                .pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/))
                .required(),
            data_nascimento: Joi.date()
                .required(),
            email: Joi.string()
                .required()
                .email(),
            senha: Joi.string()
                .required(),
            habilitado: Joi.string()
                .required()
        });
        
        const { error } = await schema.validate(req.body, { abortEarly: true });
        if(error) throw  error 
        return next();

    } catch (error) {
        res.status(400).json(error);
    }
}