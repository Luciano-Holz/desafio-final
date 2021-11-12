const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const PeopleIdInvalid = require('../errors/people/PeopleIdInvalid');
const PeopleNotFound = require('../errors/people/PeopleNotFound');
const { validateCpf } = require('../utils/cpfValidator');
const CpfIsRegisted = require('../errors/people/CpfIsregisted');
const EmailIsRegisted = require('../errors/people/EmailIsregisted');

class PeopleService {
  async create(payload) {
    if (!validateCpf(payload)) throw Error(`CPF ${payload.cpf} is invalid`);
    const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dataT = moment().diff(formatData, 'years');
    if (dataT < 18) throw Error('Age under 18 years');
    payload.data_nascimento = formatData;
    const checkCpf = await PeopleRepository.getAll({ cpf: payload.cpf });
    if (checkCpf.docs.length > 0) {
      throw new CpfIsRegisted();
    }
    const checkEmail = await PeopleRepository.getAll({ email: payload.email });
    if (checkEmail.docs.length > 0) {
      throw new EmailIsRegisted();
    }
    const results = await PeopleRepository.create(payload);
    if (!results) throw new PeopleNotFound();
    return results;
  }

  async getAll(queryParams) {
    const result = await PeopleRepository.getAll(queryParams);
    if (!result) throw new PeopleNotFound();
    return result;
  }

  async getById(_id) {
    const result = await PeopleRepository.getById(_id);
    if (!result) throw new PeopleIdInvalid(_id);
    return result;
  }

  async update(_id, payload) {
    if (!validateCpf(payload)) throw Error(`CPF ${payload.cpf} is invalid`);
    const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dataT = moment().diff(formatData, 'years');
    if (dataT < 18) throw Error('age under 18 years');
    payload.data_nascimento = formatData;
    const checkCpf = await PeopleRepository.getAll({ cpf: payload.cpf });
    if (checkCpf.docs.length > 0) {
      throw new CpfIsRegisted();
    }
    const checkEmail = await PeopleRepository.getAll({ email: payload.email });
    if (checkEmail.docs.length > 0) {
      throw new EmailIsRegisted();
    }
    const result = PeopleRepository.update(_id, payload);
    if (!result) throw new PeopleIdInvalid();
    return result;
  }

  async delete(_id) {
    const result = await PeopleRepository.delete(_id);
    if (!result) {
      throw new PeopleNotFound(_id);
    }
    return result;
  }
}

module.exports = new PeopleService();
