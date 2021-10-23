const PeopleService = require('../service/PeopleService');

class PeopleController {
    async create(req, res) {
        const results = await PeopleService.create(req.body);

        return res.status(201).json(results);
    }
}

module.exports = new PeopleController();