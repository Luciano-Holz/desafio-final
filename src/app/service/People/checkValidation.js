const moment = require('moment');
const BadRequest = require('../../errors/BadRequest');
const { validateCpf } = require('../../utils/cpfValidator');

const checkCpf = async (payload) => {
  const { cpf } = payload;
  if (!validateCpf(payload)) throw new BadRequest('Conflict', `Cpf ${cpf} is invalid`);
};

const checkAge = ({ data_nascimento }) => {
  const dataT = moment().diff(data_nascimento, 'years');
  if (dataT < 18) throw new BadRequest('data_nasimento', `Age under 18 years`);
};

const checkValidation = async (payload) => {
  await checkCpf(payload);
  checkAge(payload);
};

module.exports = { checkValidation };
