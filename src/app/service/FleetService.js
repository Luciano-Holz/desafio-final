const FleetRepository = require('../repository/FleetRepository');

class FleetService {
  async create(_id, payload) {
    const result = await FleetRepository.create(_id, payload);
    return result;
  }

  async getAll(queryParams) {
    const result = await FleetRepository.getAll(queryParams);
    return result;
  }

  async getById(_id) {
    const result = await FleetRepository.getById(_id);
    return result;
  }

  async update(_id, payload) {
    const result = await FleetRepository.update(_id, payload);
    return result;
  }
}

module.exports = new FleetService();
