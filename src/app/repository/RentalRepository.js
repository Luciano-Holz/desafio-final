const RentalSchema = require('../schema/RentalSchema');

class RentalRepository {
  async create(payload) {
    const result = RentalSchema.create(payload);
    return result;
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

  async delete(_id) {
    const result = await RentalSchema.findByIdAndDelete({ _id });
    return result;
  }
}

module.exports = new RentalRepository();
