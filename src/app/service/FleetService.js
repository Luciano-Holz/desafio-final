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
}

module.exports = new FleetService();
