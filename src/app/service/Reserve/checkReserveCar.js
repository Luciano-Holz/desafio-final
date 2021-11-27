const moment = require('moment');
const BadRequest = require('../../errors/BadRequest');
const ReserveRepository = require('../../repository/ReserveRepository');

const checkReserveCar = async (id_carro, dateStart, dateEnd) => {
  const carReserve = await ReserveRepository.getAll({ id_carro });

  carReserve.docs.forEach((element) => {
    const { data_inicio, data_fim } = element;
    if (
      !moment(dateStart, 'DD/MM/YYYY').isSameOrAfter(moment(data_fim, 'DD/MM/YYYY')) &&
      !moment(dateEnd, 'DD/MM/YYYY').isSameOrBefore(moment(data_inicio, 'DD/MM/YYYY'))
    ) {
      throw new BadRequest('Car', `This car is rented is this period.`);
    }
  });
};

module.exports = checkReserveCar;
