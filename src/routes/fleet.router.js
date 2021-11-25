const FleetController = require('../app/controller/FleetController');
const createValidation = require('../app/validation/fleet/create');
const idFleetValidation = require('../app/validation/fleet/idFleetValidation');

module.exports = (server, routes, prefix = '/api/v1/rental/') => {
  routes.post('/:_id/fleet', createValidation, FleetController.create);
  routes.get('/:_id/fleet', FleetController.getAll);
  routes.get('/:_id/fleet/:_idFleet', idFleetValidation, FleetController.getById);
  routes.put('/:_id/fleet/:_idFleet', idFleetValidation, createValidation, FleetController.update);
  routes.delete('/:_id/fleet/:_idFleet', idFleetValidation, FleetController.delete);

  server.use(prefix, routes);
};
