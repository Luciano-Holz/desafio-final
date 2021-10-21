const CarRepository = require('../repository/CarRepository');

class CarService {
    async create(payload) {
        try {
            const result = await CarRepository.create(payload);
            return result;
        } catch(error) {
            return error;
        }
    }
    async find() {
        try {
            const result = await CarRepository.find();
            return result;
        } catch(error) {
            return error;
        }
    }
    // async findOne(id) {
    //     try {
    //         const result = await CarRepository.findOne(id);
    //         return result;
    //     } catch(error) {
    //         return error;
    //     }
    // }
}

module.exports = new CarService();