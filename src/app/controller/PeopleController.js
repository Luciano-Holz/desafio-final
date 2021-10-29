const PeopleService = require('../service/PeopleService');

class PeopleController {
    async create(req, res) {
        try {
            const result = await PeopleService.create(req.body);
            const {_id, createdAt, __v,  ...people} = result.toObject();
            return res.status(201).json({people});
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async getAll(req, res) {
        try {
            const result = await PeopleService.getAll();
            const { createdAt, ...people} = result;
            res.status(200).json(people);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async getById(req, res,) {
        try {
            const result = await PeopleService.getById(req.params._id);
            const { createdAt, __v,  ...people} = result.toObject();
            res.status(200).json(people);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async update(req, res) {
        try {
            const { _id } = req.params;
            await PeopleService.update(_id, req.body);
            const result = await PeopleService.getById(req.params._id);
            const { createdAt, __v,  ...people} = result.toObject();
            res.status(200).json(people);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
       
    }
    async delete(req, res) {
        try {
            await PeopleService.delete(req.params._id);
            res.status(204).end();
        } catch (error) {
            return res.status(400).json({message: error.message});
        } 
    }
}

module.exports = new PeopleController();