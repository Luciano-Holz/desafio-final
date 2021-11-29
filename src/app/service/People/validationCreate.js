const moment = require('moment');
const BadRequest = require('../../errors/BadRequest');
const { validateCpf } = require('../../utils/cpfValidator');
const PeopleRepository = require('../../repository/PeopleRepository');

const checkCpf = async (payload) => {
  const { cpf } = payload;
  if (!validateCpf(payload)) throw new BadRequest('Conflict', `Cpf ${cpf} is invalid`);

  const checkCpfData = await PeopleRepository.getAll({ cpf });
  if (checkCpfData.docs.length > 0) {
    throw new BadRequest('Conflict', `Cpf ${cpf} is already in use`);
  }
};

const checkAge = ({ data_nascimento }) => {
  const dataT = moment().diff(data_nascimento, 'years');
  if (dataT < 18) throw new BadRequest('data_nasimento', `Age under 18 years`);
};

const checkEmail = async (payload) => {
  const { email } = payload;
  const checkEmailData = await PeopleRepository.getAll({ email });
  if (checkEmailData.docs.length > 0) {
    throw new BadRequest('Conflict', `Email ${email} is already in use`);
  }
};

const checkCreate = async (payload) => {
  await checkCpf(payload);
  checkAge(payload);
  await checkEmail(payload);
};

module.exports = { checkCreate };
