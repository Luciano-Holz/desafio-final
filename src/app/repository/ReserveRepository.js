const ReserveSchema = require('../schema/ReserveSchema');
const Repository = require('./Repository');

class ReserveRepository extends Repository {
  constructor() {
    super(ReserveSchema);
  }

  async update(_id, _idReserve, payload) {
    const result = await this.schema.findByIdAndUpdate({ id_locadora: _id, _id: _idReserve }, payload, { new: true });
    return result;
  }
}

module.exports = new ReserveRepository();
