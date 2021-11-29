const CarRepository = require('../../repository/CarRepository');
const NotFound = require('../../errors/NotFound');
const BadRequest = require('../../errors/BadRequest');

class CarService {
  async create(payload) {
    const result = await CarRepository.create(payload);
    if (!result) throw new NotFound('Car', 'not found');
    return result;
  }

  async getAll(queryParams) {
    const result = await CarRepository.getAll(queryParams);
    if (!result) throw new NotFound('Params', 'not found');
    return result;
  }

  async getById(_id) {
    const result = await CarRepository.getById(_id);
    if (!result) throw new BadRequest('id', `Id ${_id} is invalid`);
    return result;
  }

  async update(_id, payload) {
    const result = await CarRepository.update(_id, payload);
    if (!result) throw BadRequest('id', `Id ${_id} is invalid`);
    return result;
  }

  async delete(_id) {
    const result = await CarRepository.delete(_id);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }

  async patch(_id, _idAcessorio, payload) {
    const result = await CarRepository.patch(_id, _idAcessorio, payload);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }
}

module.exports = new CarService();
