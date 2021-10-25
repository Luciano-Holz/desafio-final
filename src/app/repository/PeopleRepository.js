const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload) {
        return PeopleSchema.create(payload);
    }
    async getAll() {
        return PeopleSchema.find();
    }
}

module.exports = new PeopleRepository();