const ReserveRepository = require('../../repository/ReserveRepository');
const FleetRepository = require('../../repository/FleetRepository');
const NotFound = require('../../errors/NotFound');
const BadRequest = require('../../errors/BadRequest');
const PeopleService = require('../People');
const RentalService = require('../Rental');
const checkValidation = require('./checkValidation');
const checkReserveCar = require('./checkReserveCar');
const checkReserveUser = require('./checkReserveUser');

class ReserveService {
  async create(_id, payload) {
    const { id_user, id_carro, id_locadora, data_inicio, data_fim } = payload;
    if (id_locadora !== _id) throw new BadRequest('Id Rental', 'Invalid');

    const user = await PeopleService.getById(id_user);
    if (!user) throw new NotFound('people', 'not found in database');

    const { habilitado } = user;
    if (habilitado !== 'sim') throw new BadRequest('hablitado', 'You do not have license to rent a car');

    const carFleet = await FleetRepository.getById(id_carro);
    if (!carFleet) throw new NotFound('car', 'not found in fleet');

    const rental = await RentalService.getById(id_locadora);
    if (!rental) throw new NotFound('rental', 'not found in database');

    await checkValidation(payload);
    await checkReserveUser(id_user, data_inicio, data_fim);
    await checkReserveCar(id_carro, data_inicio, data_fim);

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
    const { id_user, id_carro, id_locadora, data_inicio, data_fim } = payload;
    if (id_locadora !== _id) throw new BadRequest('Id Rental', 'Invalid');

    const user = await PeopleService.getById(id_user);
    if (!user) throw new NotFound('people', 'not found in database');

    const { habilitado } = user;
    if (habilitado !== 'sim') throw new BadRequest('hablitado', 'You do not have license to rent a car');

    const carFleet = await FleetRepository.getById(id_carro);
    if (!carFleet) throw new NotFound('car', 'not found in fleet');

    const rental = await RentalService.getById(id_locadora);
    if (!rental) throw new NotFound('rental', 'not found in database');

    await checkValidation(payload);
    await checkReserveCar(id_carro, data_inicio, data_fim);

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
