const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
    async create(payload) {
        return await PeopleSchema.create(payload);
    }
    async getAll() {
        return await PeopleSchema.find();
    }
    async getById(_id) {
        return await PeopleSchema.findById({_id});
    }
    async update(_id, payload) {
        return await PeopleSchema.findByIdAndUpdate({_id}, payload);
    }
    async delete(_id) {
        return await PeopleSchema.findByIdAndDelete({_id});
    }
    async auth({email, senha}) {
        return await PeopleSchema.findOne({email, senha});
    }
}

module.exports = new PeopleRepository();