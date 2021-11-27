const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./Repository');

class FleetRepository extends Repository {
  constructor() {
    super(FleetSchema);
  }

  async update(_id, _idFleet, payload) {
    const result = await this.schema.findByIdAndUpdate(
      {
        id_locadora: _id,
        _id: _idFleet
      },
      payload,
      { new: true }
    );
    return result;
  }

  async getById(_id) {
    const result = await FleetSchema.findById({ _id }).lean();
    return result;
  }
}

module.exports = new FleetRepository();
