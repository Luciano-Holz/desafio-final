const moment = require('moment');
const BadRequest = require('../../errors/BadRequest');
const FleetRepository = require('../../repository/FleetRepository');

const calculateValor_final = async (payload) => {
  const { data_inicio, data_fim, id_carro } = payload;
  const carFleet = await FleetRepository.getById(id_carro);

  const now = moment().format('YYYY-MM-DD');
  const dateStart = moment(data_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
  const dateEnd = moment(data_fim, 'DD/MM/YYYY').format('YYYY-MM-DD');

  const dateStartValid = moment(dateStart).isSameOrAfter(now);
  if (!dateStartValid) throw new BadRequest('data_inicio', 'Can not be earlier than today');

  const dateEndValid = moment(dateEnd).isSameOrAfter(dateStart);
  if (!dateEndValid) throw new BadRequest('data_fim', 'Can not be earlier than data_inicio');

  const { valor_diaria } = carFleet;
  const daysRent = moment(dateEnd).diff(dateStart, 'days');
  const finalValue = valor_diaria * daysRent;

  payload.data_inicio = dateStart;
  payload.data_fim = dateEnd;
  payload.valor_final = finalValue;
};

module.exports = calculateValor_final;
