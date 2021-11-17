const ReserveController = require('../app/controller/ReserveController');

module.exports = (server, routes, prefix = '/api/v1/rental/:id/reserve') => {
  routes.post('/', ReserveController.create);
  routes.get('/', ReserveController.getAll);
  routes.get('/:_id', ReserveController.getById);
  routes.put('/:_id', ReserveController.update);
  routes.delete('/:_id', ReserveController.delete);

  server.use(prefix, routes);
};
