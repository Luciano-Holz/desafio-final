const RentalController = require('../app/controller/RentalController');
const IdValidation = require('../app/validation/idValidation');
const CreateValidation = require('../app/validation/rental/create');

module.exports = (server, routes, prefix = '/api/v1/rental') => {
  routes.post('/', CreateValidation, RentalController.create);
  routes.get('/', RentalController.getAll);
  routes.get('/:_id', IdValidation, RentalController.getById);
  routes.put('/:_id', IdValidation, CreateValidation, RentalController.update);
  routes.delete('/:_id', IdValidation, RentalController.delete);

  server.use(prefix, routes);
};
