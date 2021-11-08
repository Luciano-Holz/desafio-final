const RentalController = require('../app/controller/RentalController');
const createValidation = require('../app/validation/rental/create');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', createValidation, RentalController.create);
  routes.get('/', RentalController.getAll);
  routes.get('/:_id', RentalController.getById);

  server.use(prefix, routes);
};
