const moment = require('moment');
const BadRequest = require('../../errors/BadRequest');
const ReserveRepository = require('../../repository/ReserveRepository');

const checkReserveUser = async (id_user, dateStart, dateEnd) => {
  const userReserve = await ReserveRepository.getAll({ id_user });

  userReserve.docs.forEach((element) => {
    const { data_inicio, data_fim } = element;
    if (
      !moment(dateStart, 'DD/MM/YYYY').isSameOrAfter(moment(data_fim, 'DD/MM/YYYY')) &&
      !moment(dateEnd, 'DD/MM/YYYY').isSameOrBefore(moment(data_inicio, 'DD/MM/YYYY'))
    ) {
      throw new BadRequest('Car', `This user ${id_user} cannot rent a car in this period.`);
    }
  });

  return true;
};

module.exports = checkReserveUser;
