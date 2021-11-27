const moment = require('moment');
const ReserveRepository = require('../repository/ReserveRepository');
const FleetRepository = require('../repository/FleetRepository');
const NotFound = require('../errors/NotFound');
const BadRequest = require('../errors/BadRequest');
const PeopleService = require('./People');
const RentalService = require('./RentalService');

class ReserveService {
  async create(_id, payload) {
    const { data_inicio, data_fim, id_user, id_carro, id_locadora } = payload;
    if (id_locadora !== _id) throw new BadRequest('Id Rental', 'Invalid');

    const user = await PeopleService.getById(id_user);
    if (!user) throw new NotFound('people', 'not found in database');

    const { habilitado } = user;
    if (habilitado !== 'sim') throw new BadRequest('hablitado', 'Não está habilitado');

    const carFleet = await FleetRepository.getById(id_carro);
    if (!carFleet) throw new NotFound('car', 'not found in fleet');

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

    const rental = await RentalService.getById(id_locadora);
    if (!rental) throw new NotFound('rental', 'not found in database');

    const result = await ReserveRepository.create(payload);
    if (!result) throw new NotFound('Reserve', 'not found');
    return result;
  }

  async getAll(queryParams) {
    const result = await ReserveRepository.getAll(queryParams);
    if (!result) throw new NotFound('Fleet', `not found`);
    return result;
  }

  async getById(_id, _idReserve) {
    const result = await ReserveRepository.getById(_idReserve);
    if (!result) throw new NotFound('id', `Id ${_idReserve} not found`);
    return result;
  }

  async update(_id, _idFleet, payload) {
    const { data_inicio, data_fim, id_user, id_carro, id_locadora } = payload;
    if (id_locadora !== _id) throw new BadRequest('Id Rental', 'Invalid');

    const people = await PeopleService.getById(id_user);
    if (!people) throw new NotFound('people', 'not found in database');

    const dateStart = moment(data_inicio, 'DD/MM/YYYY').format('YYYY-MM-DD');
    const dateEnd = moment(data_fim, 'DD/MM/YYYY').format('YYYY-MM-DD');
    payload.data_inicio = dateStart;
    payload.data_fim = dateEnd;

    const carFleet = await FleetRepository.getById(id_carro);
    if (!carFleet) throw new NotFound('car', 'not found in fleet');

    const rental = await RentalService.getById(id_locadora);
    if (!rental) throw new NotFound('rental', 'not found in database');

    const result = await ReserveRepository.update(_id, _idFleet, payload);
    if (!result) throw new NotFound('Reserve', `not found in database`);
    return result;
  }

  async delete(_id) {
    const result = await ReserveRepository.delete(_id);
    if (!result) throw new NotFound('id', `Id ${_id} not found`);
    return result;
  }
}

module.exports = new ReserveService();
