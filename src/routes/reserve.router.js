const ReserveController = require('../app/controller/ReserveController');
const createValidation = require('../app/validation/reserve/create');
const idReserveValidation = require('../app/validation/reserve/idReserveValidation');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:_id/reserve', createValidation, ReserveController.create);
  routes.get('/:_id/reserve', ReserveController.getAll);
  routes.get('/:_id/reserve/:_idReserve', idReserveValidation, ReserveController.getById);
  routes.put('/:_id/reserve/:_idReserve', idReserveValidation, createValidation, ReserveController.update);
  routes.delete('/:_id/reserve/:_idReserve', idReserveValidation, ReserveController.delete);

  server.use(prefix, routes);
};
