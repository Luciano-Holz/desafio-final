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
    async update(_id, payload) {
        return PeopleSchema.findByIdAndUpdate({_id}, payload);
    }
    async delete(_id) {
        return PeopleSchema.findByIdAndDelete({_id});
    }
}

module.exports = new PeopleRepository();