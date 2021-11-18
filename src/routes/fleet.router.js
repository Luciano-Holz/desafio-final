const FleetController = require('../app/controller/FleetController');

module.exports = (server, routes, prefix = '/api/v1/rental/:_id/fleet') => {
  routes.post('/', FleetController.create);

  server.use(prefix, routes);
};
