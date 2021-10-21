//file repositorys
const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload) {
        return CarSchema.create(payload);
    }
    async find() {
        return CarSchema.find();
    }
    // async findOne(_id) {
    //     return await CarSchema.findOne({_id}).exec();
    // }
}

module.exports = new CarRepository();