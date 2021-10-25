const PeopleService = require('../service/PeopleService');

class PeopleController {
    async create(req, res) {
        const result = await PeopleService.create(req.body);
        return res.status(201).json(result);
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
}

module.exports = new PeopleController();