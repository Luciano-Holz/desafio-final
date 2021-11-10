const moment = require('moment');
const PeopleRepository = require('../repository/PeopleRepository');
const PeopleIdInvalid = require('../errors/people/PeopleIdInvalid');
const PeopleNotFound = require('../errors/people/PeopleNotFound');
const { validateCpf } = require('../utils/cpfValidator');

class PeopleService {
  async create(payload) {
    if (!validateCpf(payload)) throw Error(`CPF ${payload.cpf} is invalid`);
    const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dataT = moment().diff(formatData, 'years');
    if (dataT < 18) throw Error('Age under 18 years');
    payload.data_nascimento = formatData;
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
    const cpfnew = payload.cpf;
    const cpf = cpfnew.replace(/\.|-/g, '');
    function validateCPF(cpF) {
      const cpfs = cpf.replace(/[^\d]+/g, '');
      if (cpfs === '') return false;
      if (
        cpF.length !== 11 ||
        cpF === '00000000000' ||
        cpF === '11111111111' ||
        cpF === '22222222222' ||
        cpF === '33333333333' ||
        cpF === '44444444444' ||
        cpF === '55555555555' ||
        cpF === '66666666666' ||
        cpF === '77777777777' ||
        cpF === '88888888888' ||
        cpF === '99999999999'
      )
        return false;
      let add = 0;
      for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i), 10) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev === 10 || rev === 11) rev = 0;
      if (rev !== parseInt(cpf.charAt(9), 10)) return false;
      add = 0;
      for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i), 10) * (11 - i);
      rev = 11 - (add % 11);
      if (rev === 10 || rev === 11) rev = 0;
      if (rev !== parseInt(cpf.charAt(10), 10)) return false;
      return true;
    }
    if (!validateCPF(cpf)) throw Error(`CPF ${cpf} is invalid`);
    console.log(Error);
    payload.cpf = cpfnew;
    const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dataT = moment().diff(formatData, 'years');
    if (dataT < 18) throw Error('age under 18 years');
    payload.data_nascimento = formatData;
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
