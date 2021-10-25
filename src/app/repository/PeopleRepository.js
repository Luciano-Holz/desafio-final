const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload) {
        return PeopleSchema.create(payload);
    }
    async getAll() {
        return PeopleSchema.find();
    }
    async getById(_id) {
        return PeopleSchema.findById({_id});
    }
}

module.exports = new PeopleRepository();