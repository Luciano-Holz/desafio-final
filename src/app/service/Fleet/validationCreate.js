const BadRequest = require('../../errors/BadRequest');
const FleetRepository = require('../../repository/FleetRepository');

const checkPlaca = async (placa) => {
  const placaValid = await FleetRepository.getAll({ placa });
  if (placaValid.docs.length > 0) {
    throw new BadRequest('Conflict', `This placa ${placa} already exists in this Rental`);
  }
};

module.exports = checkPlaca;
