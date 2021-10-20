//file to validate datas
const Joi = require('joi');

module.exports = async (req, res, next) => {
    try {
        const schema = Joi.object({
            model: Joi.string().required(),
            color: Joi.string().required(),
            year: Joi.date().required(),
            accessories: Joi.array().required(),
            quantityPassengers: Joi.number().required()
        });

        const { error } = await schema.validate(req.body, { abortEarly: true });
        if(error) throw  error 
        return next();
    } catch(error) {
        return res.status(400).json(error);
    }
}