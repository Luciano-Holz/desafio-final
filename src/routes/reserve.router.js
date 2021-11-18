const ReserveController = require('../app/controller/ReserveController');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:_id/reserve', ReserveController.create);
  routes.get('/:_id/reserve', ReserveController.getAll);
  routes.get('/:_id/reserve/:_idReserve', ReserveController.getById);
  routes.put('/:_id/reserve/:_idReserve', ReserveController.update);
  routes.delete('/:_id/reserve/:_idReserve', ReserveController.delete);

  server.use(prefix, routes);
};
