const FleetSchema = require('../schema/FleetSchema');

class FleetRepository {
  async create(_id, payload) {
    const result = await FleetSchema.create(_id, payload);
    return result;
  }

  async getAll(queryParams) {
    const { page = 1, limit = 100, ...query } = queryParams;
    const result = await FleetSchema.paginate(
      { ...query },
      {
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit)
      }
    );
    return result;
  }
}

module.exports = new FleetRepository();
