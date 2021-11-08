const PeopleController = require('../app/controller/PeopleController');
const IdValidation = require('../app/validation/idValidation');
const createValidation = require('../app/validation/people/create');

module.exports = (server, routes, prefix = '/api/v1/people') => {
  routes.post('/', createValidation, PeopleController.create);
  routes.get('/', PeopleController.getAll);
  routes.get('/:_id', IdValidation, PeopleController.getById);
  routes.put('/:_id', IdValidation, createValidation, PeopleController.update);
  routes.delete('/:_id', IdValidation, PeopleController.delete);

  server.use(prefix, routes);
};
