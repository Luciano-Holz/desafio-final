const CarSchema = require('../schema/CarSchema');
const Repository = require('./Repository');

class CarRepository extends Repository {
  constructor() {
    super(CarSchema);
  }

  async patch(_id, _idAcessorio, payload) {
    const result = await CarSchema.findOneAndUpdate(
      { _id, 'acessorios._id': _idAcessorio },
      {
        $set: {
          'acessorios.$.descricao': payload.descricao
        }
      },
      { new: true, safe: true, upsert: true }
    );
    return result;
  }
}

module.exports = new CarRepository();
