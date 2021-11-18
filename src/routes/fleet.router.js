const FleetController = require('../app/controller/FleetController');

module.exports = (server, routes, prefix = '/api/v1/rental/:_id/fleet') => {
  routes.post('/', FleetController.create);
  routes.get('/', FleetController.getAll);
  routes.get('/:_id', FleetController.getById);
  routes.put('/:_id', FleetController.update);
  routes.delete('/:_id', FleetController.delete);

  server.use(prefix, routes);
};
