const FleetSchema = require('../schema/FleetSchema');
const Repository = require('./Repository');

class FleetRepository extends Repository {
  constructor() {
    super(FleetSchema);
  }
}

module.exports = new FleetRepository();
