const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const { checkCreate } = require('./People/validationCreate');
const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const { validateCpf } = require('../utils/cpfValidator');

class PeopleService {
  async create(payload) {
    payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    await checkCreate(payload);
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
