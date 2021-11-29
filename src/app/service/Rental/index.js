const BadRequest = require('../../errors/BadRequest');
const NotFound = require('../../errors/NotFound');
const RentalRepository = require('../../repository/RentalRepository');
const ViacepRepository = require('../../repository/ViacepRepository');
const { checkCreate } = require('./validationCreate');

class RentalService {
  async create(payload) {
    // for (let i = 0; i < payload.endereco.length; i++) {
    //   // eslint-disable-next-line no-await-in-loop
    //   const viaCep = await ViacepRepository.viaCep(payload.endereco[i].cep);
    //   const { logradouro, complemento, bairro, localidade, uf } = viaCep;
    //   payload.endereco[i].logradouro = logradouro;
    //   payload.endereco[i].complemento = complemento;
    //   payload.endereco[i].bairro = bairro;
    //   payload.endereco[i].localidade = localidade;
    //   payload.endereco[i].uf = uf;
    // }

    const { endereco } = payload;

    payload.endereco = Promise.all(
      await endereco.map(async (addres) => {
        const response = await ViacepRepository.viaCep(addres.cep);
        if (!response) throw new BadRequest('Cep', `The cep ${addres.cep} is not provided.`);

        const completAddres = { ...payload, ...response };

        return completAddres;
      })
    );

    await checkCreate(payload);
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

    await checkCreate(payload);
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
