
const Joi = require('joi').extend(require('@joi/date'));

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            nome: Joi.string()
                .trim()
                .required(),
            cpf: Joi.string()
                .pattern(new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/))             
                .required(),
            data_nascimento: Joi.date().format('DD/MM/YYYY')
                .required(),
            email: Joi.string()
                .email()
                .required(),
            senha: Joi.string()
                .min(6)
                .required(),
            habilitado: Joi.string()
                .valid('sim', 'nao')
                .required()
        });
       
        const { error } = await schema.validate(req.body, { abortEarly: false });
        if(error) throw  error 
        return next();

    } catch (error) {
        res.status(400).json(error);
    }
}