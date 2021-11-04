const CarRepository = require('../repository/CarRepository');
const CarNotFound = require('../errors/car/CarNotFound');

class CarService {
  async create(payload) {
    const result = await CarRepository.create(payload);
    if (!result) throw new CarNotFound();
    return result;
  }

  async getAll(queryParams) {
    const result = await CarRepository.getAll(queryParams);
    if (!result) throw new CarNotFound();
    return result;
  }

  async getById(_id) {
    const result = await CarRepository.getById(_id);
    if (!result) throw new CarNotFound(_id);
    return result;
  }

  async update(_id, payload) {
    const result = await CarRepository.update(_id, payload);
    if (!result) throw new CarNotFound(_id);
    return result;
  }

  async delete(_id) {
    const result = await CarRepository.delete(_id);
    if (!result) {
      throw new CarNotFound(_id);
    }
    return result;
  }
}

module.exports = new CarService();
