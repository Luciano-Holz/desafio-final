const RentalRepository = require('../repository/RentalRepository');
const viacepRepository = require('../repository/ViacepRepository');

class RentalService {
  async create(payload) {
    const viaCep = await viacepRepository.viaCep(payload.endereco[0].cep);
    const { cep, logradouro, complemento, bairro, localidade, uf } = viaCep;
    payload.endereco = [
      {
        cep,
        logradouro,
        number: payload.endereco[0].number,
        complemento,
        bairro,
        localidade,
        uf,
        isFilial: payload.endereco[0].isFilial
      }
    ];
    const result = await RentalRepository.create(payload);
    return result;
  }
}

module.exports = new RentalService();
