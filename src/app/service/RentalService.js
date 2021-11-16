const CnpjInvalid = require('../errors/rental/CnpjInvalid');
const IsFilialExists = require('../errors/rental/IsFilialExists');
const RentalNotFound = require('../errors/rental/RentalNotFound');
const RentalRepository = require('../repository/RentalRepository');
const ViacepRepository = require('../repository/ViacepRepository');
const { validateCnpj } = require('../utils/cnpjValidator');

class RentalService {
  async create(payload) {
    if (!validateCnpj(payload)) throw new CnpjInvalid(payload.cnpj);
    for (let i = 0; i < payload.endereco.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const viaCep = await ViacepRepository.viaCep(payload.endereco[i].cep);
      const { logradouro, complemento, bairro, localidade, uf } = viaCep;
      payload.endereco[i].logradouro = logradouro;
      payload.endereco[i].complemento = complemento;
      payload.endereco[i].bairro = bairro;
      payload.endereco[i].localidade = localidade;
      payload.endereco[i].uf = uf;
    }

    let newEndereco = 0;
    payload.endereco.forEach((endereco) => {
      if (!endereco.isFilial) {
        newEndereco += 1;
      }
      if (newEndereco > 1) {
        throw new IsFilialExists();
      }
    });
    const result = await RentalRepository.create(payload);
    if (!result) throw new RentalNotFound();
    return result;
  }

  async getAll(queryParams) {
    const result = await RentalRepository.getAll(queryParams);
    if (!result) throw new RentalNotFound();
    return result;
  }

  async getById(_id) {
    const result = await RentalRepository.getById(_id);
    if (!result) throw new RentalNotFound(_id);
    return result;
  }

  async update(_id, payload) {
    if (!validateCnpj(payload)) throw new CnpjInvalid(payload.cnpj);
    for (let i = 0; i < payload.endereco.length; i++) {
      // eslint-disable-next-line no-await-in-loop
      const viaCep = await ViacepRepository.viaCep(payload.endereco[i].cep);
      const { logradouro, complemento, bairro, localidade, uf } = viaCep;
      payload.endereco[i].logradouro = logradouro;
      payload.endereco[i].complemento = complemento;
      payload.endereco[i].bairro = bairro;
      payload.endereco[i].localidade = localidade;
      payload.endereco[i].uf = uf;
    }

    let newEndereco = 0;
    payload.endereco.forEach((endereco) => {
      if (!endereco.isFilial) {
        newEndereco += 1;
      }
      if (newEndereco > 1) {
        throw new IsFilialExists();
      }
    });
    const result = await RentalRepository.update(_id, payload);
    if (!result) throw new RentalNotFound();
    return result;
  }

  async delete(_id) {
    const result = await RentalRepository.delete(_id);
    if (!result) throw new RentalNotFound(_id);
    return result;
  }
}

module.exports = new RentalService();
