const FleetController = require('../app/controller/FleetController');
const createValidation = require('../app/validation/fleet/create');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:_id/fleet', createValidation, FleetController.create);
  routes.get('/:_id/fleet', FleetController.getAll);
  routes.get('/:_id/fleet/:_idFleet', FleetController.getById);
  routes.put('/:_id/fleet/:_idFleet', createValidation, FleetController.update);
  routes.delete('/:_id/fleet/:_idFleet', FleetController.delete);

  server.use(prefix, routes);
};
