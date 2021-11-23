const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const { validateCpf } = require('../utils/cpfValidator');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');

class PeopleService {
  async create(payload) {
    if (!validateCpf(payload)) throw new BadRequest('Conflict', `Cpf ${payload.cpf} is invalid`);
    const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dataT = moment().diff(formatData, 'years');
    if (dataT < 18) throw new BadRequest('data_nasimento', `Age under 18 years`);
    payload.data_nascimento = formatData;

    const checkCpf = await PeopleRepository.getAll({ cpf: payload.cpf });
    if (checkCpf.docs.length > 0) {
      throw new BadRequest('Conflict', `Cpf ${payload.cpf} is already in use`);
    }
    const checkEmail = await PeopleRepository.getAll({ email: payload.email });
    if (checkEmail.docs.length > 0) {
      throw new BadRequest('Conflict', `Email ${payload.email} is already in use`);
    }
    const results = await PeopleRepository.create(payload);
    if (!results) throw new NotFound('People', 'not found');
    return results;
  }

  async getAll(queryParams) {
    const result = await PeopleRepository.getAll(queryParams);
    if (!result) throw new NotFound('Params', 'not found');
    return result;
  }

  async getById(_id) {
    const result = await PeopleRepository.getById(_id);
    if (!result) throw new BadRequest('id', `Id ${_id} is invalid`);
    return result;
  }

  async update(_id, payload) {
    if (!validateCpf(payload)) throw new BadRequest('Conflict', `Cpf ${payload.cpf} is invalid`);
    const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dataT = moment().diff(formatData, 'years');
    if (dataT < 18) throw BadRequest('data_nasimento', `Age under 18 years`);
    payload.data_nascimento = formatData;

    const result = PeopleRepository.update(_id, payload);
    if (!result) throw new BadRequest('id', `Id ${_id} is invalid`);
    return result;
  }

  async delete(_id) {
    const result = await PeopleRepository.delete(_id);
    if (!result) {
      throw new NotFound('id', `Id ${_id} not found`);
    }
    return result;
  }
}

module.exports = new PeopleService();
