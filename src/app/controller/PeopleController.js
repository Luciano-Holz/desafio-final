const PeopleService = require('../service/PeopleService');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

class PeopleController {
    async create(req, res) {
        try {
            const result = await PeopleService.create(req.body);
            const { senha, createdAt,  ...people } = result.toObject();
            function generateToken(params = {}) {
                return jwt.sign(params, authConfig.secret, { expiresIn: 86400});
            }
            return res.status(201)
                .json({people, token: generateToken({id: people._id})});
        } catch (error) {
            return res.status(400).json(error);
        }
        
    }
    async getAll(req, res) {
        const result = await PeopleService.getAll();
        res.status(200).json(result);
    }
    async getById(req, res) {
        const result = await PeopleService.getById(req.params._id);
        res.status(200).json(result);
    }
    async update(req, res) {
        const { _id } = req.params;
         await PeopleService.update(_id, req.body);
        const result =await PeopleService.getById(_id);
        res.status(200).json(result);
    }
    async delete(req, res) {
        await PeopleService.delete(req.params._id);
        res.status(204).end();
    }
}

module.exports = new PeopleController();