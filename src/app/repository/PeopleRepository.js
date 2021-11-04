const PeopleSchema = require('../schema/PeopleSchema');

class PeopleRepository {
  async create(payload) {
    const result = await PeopleSchema.create(payload);
    return result;
  }

  async getAll(queryParams) {
    const { page = 1, limit = 100, ...query } = queryParams;
    const result = await PeopleSchema.paginate(
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
    const result = await PeopleSchema.findById({ _id });
    return result;
  }

  async update(_id, payload) {
    const result = await PeopleSchema.findByIdAndUpdate({ _id }, payload);
    return result;
  }

  async delete(_id) {
    const result = await PeopleSchema.findByIdAndDelete({ _id });
    return result;
  }

  async auth({ email, senha }) {
    const result = await PeopleSchema.findOne({ email, senha });
    return result;
  }
}

module.exports = new PeopleRepository();
