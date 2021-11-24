const BadRequest = require('../errors/BadRequest');

const AddressDuplicate = (endereco) => {
  const addressArray = [];

  endereco.forEach((element) => {
    const { cep, number } = element;
    if (addressArray.includes(cep + number)) {
      throw new BadRequest('Conflict', `You are trying register duplicated the same Cep ${cep} and Number ${number}.`);
    }
    addressArray.push(cep + number);
  });
};
module.exports = AddressDuplicate;
