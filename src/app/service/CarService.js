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
    async getAll(queryParams) {
        try {
            const result = await CarRepository.getAll(queryParams);
            return result;
        } catch(error) {
            return error;
        }
    }
    async getById(id) {
        try {
            const result = await CarRepository.getById(id);
            return result;
        } catch(error) {
            return error;
        }
    }
    async update(id, payload) {
        try {
            const result = await CarRepository.update(id, payload);
            return result;
        } catch(error) {
            return error;
        }
    }
    async delete(id) {
        try {
            const result = await CarRepository.delete(id);
            return result;
        } catch(error) {
            return error;
        }
    }
}

module.exports = new CarService();