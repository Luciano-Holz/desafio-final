const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload) {
        return PeopleSchema.create(payload);
    }
}

module.exports = new PeopleRepository();