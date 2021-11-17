const ReserveSchema = require('../schema/ReserveSchema');

class ReserveRepository {
  async create(payload) {
    const result = await ReserveSchema.create(payload);
    return result;
  }
}

module.exports = new ReserveRepository();
