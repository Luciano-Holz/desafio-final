const FleetController = require('../app/controller/FleetController');

module.exports = (server, routes, prefix = '/api/v1/rental/:_id/fleet') => {
  routes.post('/', FleetController.create);
  routes.get('/', FleetController.getAll);

  server.use(prefix, routes);
};
