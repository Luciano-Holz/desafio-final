const ReserveRepository = require('../repository/ReserveRepository');

class ReserveService {
  async create(payload) {
    const result = await ReserveRepository.create(payload);
    return result;
  }
}

module.exports = new ReserveService();
