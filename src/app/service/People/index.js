const moment = require('moment');
const PeopleRepository = require('../../repository/PeopleRepository');
const { checkValidation } = require('./validationCreate');
const BadRequest = require('../../errors/BadRequest');
const NotFound = require('../../errors/NotFound');

class PeopleService {
  async create(payload) {
    const { cpf, email } = payload;
    payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    await checkValidation(payload);

    const checkCpfData = await PeopleRepository.getAll({ cpf });
    if (checkCpfData.docs.length > 0) {
      throw new BadRequest('Conflict', `Cpf ${cpf} is already in use`);
    }

    const checkEmailData = await PeopleRepository.getAll({ email });
    if (checkEmailData.docs.length > 0) {
      throw new BadRequest('Conflict', `Email ${email} is already in use`);
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
    payload.data_nascimento = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    await checkValidation(payload);
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
