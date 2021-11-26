const ReserveController = require('../app/controller/ReserveController');
const createValidation = require('../app/validation/reserve/create');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:_id/reserve', createValidation, ReserveController.create);
  routes.get('/:_id/reserve', ReserveController.getAll);
  routes.get('/:_id/reserve/:_idReserve', ReserveController.getById);
  routes.put('/:_id/reserve/:_idReserve', createValidation, ReserveController.update);
  routes.delete('/:_id/reserve/:_idReserve', ReserveController.delete);

  server.use(prefix, routes);
};
