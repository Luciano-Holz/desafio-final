const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const addressDuplicate = require('../helpers/AddressDuplicate');
const RentalRepository = require('../repository/RentalRepository');
const ViacepRepository = require('../repository/ViacepRepository');
const { validateCnpj } = require('../utils/cnpjValidator');

class RentalService {
  async create(payload) {
    if (!validateCnpj(payload)) throw new BadRequest('Bad Request', `Invalid CNPJ ${payload.cnpj} `);
    const checkCnpj = await RentalRepository.getAll({ cnpj: payload.cnpj });
    if (checkCnpj.docs.length > 0) {
      throw new BadRequest('Conflict', `Cnpj ${payload.cnpj} is already in use`);
    }
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
        throw new BadRequest('Conflict', 'IsFilial false is possible only in one address');
      }
    });
    if (payload.endereco) {
      const { endereco } = payload;
      addressDuplicate(endereco);
    }
    const result = await RentalRepository.create(payload);
    if (!result) throw new NotFound('Rental', 'not found');
    return result;
  }

  async getAll(queryParams) {
    const result = await RentalRepository.getAll(queryParams);
    if (!result) throw new NotFound('Params', 'not found');
    return result;
  }

  async getById(_id) {
    const result = await RentalRepository.getById(_id);
    if (!result) throw new BadRequest('id', `Id ${_id} is invalid`);
    return result;
  }

  async update(_id, payload) {
    if (!validateCnpj(payload)) throw new BadRequest('Bad Request', `Invalid CNPJ ${payload.cnpj} `);
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
        throw new BadRequest('Conflict', 'IsFilial false is possible only one');
      }
    });
    if (payload.endereco) {
      const { endereco } = payload;
      addressDuplicate(endereco);
    }
    const result = await RentalRepository.update(_id, payload);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }

  async delete(_id) {
    const result = await RentalRepository.delete(_id);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }
}

module.exports = new RentalService();
