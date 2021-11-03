const CarErrors = require('../errors/car/CarErrors');
const CarRepository = require('../repository/CarRepository');

class CarService {
  async create(payload) {
    const result = await CarRepository.create(payload);
    return result;
  }

  async getAll(queryParams) {
    const result = await CarRepository.getAll(queryParams);
    return result;
  }

  async getById(id) {
    const result = await CarRepository.getById(id);
    if (!result) throw new CarErrors();
    return result;
  }

  async update(id, payload) {
    const result = await CarRepository.update(id, payload);
    return result;
  }

  async delete(id) {
    const result = await CarRepository.delete(id);
    return result;
  }
}

module.exports = new CarService();
