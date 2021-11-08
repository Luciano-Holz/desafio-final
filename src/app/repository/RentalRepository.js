const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    return RentalSchema.create(payload);
  }

  async getAll(queryParams) {
    const { page = 1, limit = 100, ...query } = queryParams;
    const result = await RentalSchema.paginate(
      { ...query },
      {
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit)
      }
    );
    return result;
  }

  async getById(_id) {
    const result = await RentalSchema.findById({ _id });
    return result;
  }

  async update(_id, payload) {
    const result = await RentalSchema.findByIdAndUpdate({ _id }, payload, { new: true });
    return result;
  }
}

module.exports = new RentalRepository();
