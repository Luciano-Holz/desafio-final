const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload) {
        return CarSchema.create(payload);
    }
    async find() {
        return CarSchema.find();
    }
    async findOne(_id) {
        return await CarSchema.findOne({_id});
    }
    async deleteOne(_id) {
        return await CarSchema.deleteOne({_id});
    }
}

module.exports = new CarRepository();