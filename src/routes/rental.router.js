const RentalController = require('../app/controller/RentalController');
const CreateValidation = require('../app/validation/rental/create');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', CreateValidation, RentalController.create);
  routes.get('/', RentalController.getAll);
  routes.get('/:_id', RentalController.getById);
  routes.put('/:_id', CreateValidation, RentalController.update);

  server.use(prefix, routes);
};
