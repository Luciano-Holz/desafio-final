const BadRequest = require('../../errors/BadRequest');
const NotFound = require('../../errors/NotFound');
const RentalRepository = require('../../repository/RentalRepository');
const { checkCreate } = require('./validationCreate');

class RentalService {
  async create(payload) {
    await checkCreate(payload);
    const result = await RentalRepository.create(payload);
    if (!result) throw new NotFound('Rental', 'not found');
    return result;
  }

  async getAll(queryParams) {
    const result = await RentalRepository.getAll(queryParams);
    if (!result) throw new NotFound('Params', 'not found');
    return result;
  }

  async getById(_id) {
    const result = await RentalRepository.getById(_id);
    if (!result) throw new BadRequest('id', `Id ${_id} is invalid`);
    return result;
  }

  async update(_id, payload) {
    await checkCreate(payload);
    const result = await RentalRepository.update(_id, payload);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }

  async delete(_id) {
    const result = await RentalRepository.delete(_id);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }
}

module.exports = new RentalService();
