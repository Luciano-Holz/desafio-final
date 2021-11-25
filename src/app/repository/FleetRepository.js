const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./Repository');

class FleetRepository extends Repository {
  constructor() {
    super(FleetSchema);
  }

  // async getById(_id) {
  //   const result = await FleetSchema.findById({ _id }).populate(['id_carro', 'id_locadora']);
  //   return result;
  // }
}

module.exports = new FleetRepository();
