const FleetSchema = require('../schema/FleetSchema');

class FleetRepository {
  async create(_id, payload) {
    const result = await FleetSchema.create(_id, payload);
    return result;
  }
}

module.exports = new FleetRepository();
