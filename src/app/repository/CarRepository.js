const CarSchema = require('../schema/CarSchema');

class CarRepository {
  async create(payload) {
    return CarSchema.create(payload);
  }

  async getAll(queryParams) {
    const { page = 1, limit = 100, ...query } = queryParams;
    const result = await CarSchema.paginate(
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
    const result = await CarSchema.findById({ _id });
    return result;
  }

  async update(_id, payload) {
    const result = await CarSchema.findByIdAndUpdate({ _id }, payload);
    return result;
  }

  async delete(_id) {
    const result = await CarSchema.findByIdAndDelete({ _id });
    return result;
  }

  async patch(_id, _idAcessorio, payload) {
    const result = await CarSchema.findOne({ _id });
    const newAcessorios = [];
    result.acessorios.forEach((e) => {
      if (e._id !== _id) newAcessorios.push(e);
      if (e._id === _id) newAcessorios.push(payload);
    });
    return result;
  }
}

module.exports = new CarRepository();
