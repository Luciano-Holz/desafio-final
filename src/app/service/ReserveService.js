const ReserveRepository = require('../repository/ReserveRepository');

class ReserveService {
  async create(payload) {
    const result = await ReserveRepository.create(payload);
    return result;
  }

  async getAll(queryParams) {
    const result = await ReserveRepository.getAll(queryParams);
    return result;
  }

  async getById(_id) {
    const result = await ReserveRepository.getById(_id);
    return result;
  }
}

module.exports = new ReserveService();
