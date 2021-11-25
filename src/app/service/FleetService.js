const BadRequest = require('../errors/BadRequest');
const FleetRepository = require('../repository/FleetRepository');

class FleetService {
  async create(_id, payload) {
    const checkPlaca = await FleetRepository.getAll({ placa: payload.placa });
    if (checkPlaca.docs.length > 0) {
      throw new BadRequest('Conflict', `This placa ${payload.placa} already exists in this Rental`);
    }
    const result = await FleetRepository.create(_id, payload);
    return result;
  }

  async getAll(queryParams) {
    const result = await FleetRepository.getAll(queryParams);
    return result;
  }

  async getById(_id, _idFleet) {
    const result = await FleetRepository.getById(_id, _idFleet);
    return result;
  }

  async update(_id, payload) {
    const result = await FleetRepository.update(_id, payload);
    return result;
  }

  async delete(_id) {
    const result = await FleetRepository.delete(_id);
    return result;
  }
}

module.exports = new FleetService();
