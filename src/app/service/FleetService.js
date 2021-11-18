const FleetRepository = require('../repository/FleetRepository');

class FleetService {
  async create(_id, payload) {
    const result = await FleetRepository.create(_id, payload);
    return result;
  }
}

module.exports = new FleetService();
