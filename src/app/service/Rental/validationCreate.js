const BadRequest = require('../../errors/BadRequest');
const { validateCnpj } = require('../../utils/cnpjValidator');
const RentalRepository = require('../../repository/RentalRepository');
const AddressDuplicate = require('../../helpers/AddressDuplicate');
const ViacepRepository = require('../../repository/ViacepRepository');

const checkCep = async (payload) => {
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
};

const checkCnpj = async (payload) => {
  const { cnpj } = payload;
  if (!validateCnpj(payload)) throw new BadRequest('Bad Request', `Invalid CNPJ ${cnpj} `);

  const checkCnpjData = await RentalRepository.getAll({ cnpj });
  if (checkCnpjData.docs.length > 0) {
    throw new BadRequest('Conflict', `Cnpj ${cnpj} is already in use`);
  }
};

const checkisFilial = (payload) => {
  let newEndereco = 0;
  payload.endereco.forEach((endereco) => {
    if (!endereco.isFilial) {
      newEndereco += 1;
    }
    if (newEndereco > 1) {
      throw new BadRequest('Conflict', 'This rental company may have only one parent office');
    }
  });
};

const addressDuplication = (payload) => {
  if (payload.endereco) {
    const { endereco } = payload;
    AddressDuplicate(endereco);
  }
};

const checkCreate = async (payload) => {
  await checkCep(payload);
  await checkCnpj(payload);
  checkisFilial(payload);
  addressDuplication(payload);
};

module.exports = { checkCreate };
