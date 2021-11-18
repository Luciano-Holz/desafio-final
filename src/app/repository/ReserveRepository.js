const ReserveSchema = require('../schema/ReserveSchema');

class ReserveRepository {
  async create(_id, payload) {
    const result = await ReserveSchema.create(payload);
    return result;
  }

  async getAll(queryParams) {
    const { page = 1, limit = 100, ...query } = queryParams;
    const result = await ReserveSchema.paginate(
      { ...query },
      {
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit)
      }
    );
    return result;
  }

  async getById(_id, _idReserve) {
    const result = await ReserveSchema.findById({ _id: _idReserve });
    return result;
  }

  async update(_id, payload) {
    const result = await ReserveSchema.findByIdAndUpdate({ _id }, payload, { new: true });
    return result;
  }

  async delete(_id) {
    const result = await ReserveSchema.findByIdAndDelete({ _id });
    return result;
  }
}

module.exports = new ReserveRepository();
