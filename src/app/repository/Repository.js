class Repository {
  constructor(schema) {
    this.schema = schema;
  }

  async create(payload) {
    const result = await this.schema.create(payload);
    return result;
  }

  async getAll(queryParams) {
    const { page = 1, limit = 100, ...query } = queryParams;
    const result = await this.schema.paginate(
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
    const result = await this.schema.findById({ _id }).lean();
    return result;
  }

  async update(_id, payload) {
    const result = await this.schema.findByIdAndUpdate({ _id }, payload, { new: true });
    return result;
  }

  async delete(_id) {
    const result = await this.schema.findByIdAndDelete({ _id });
    return result;
  }
}

module.exports = Repository;
