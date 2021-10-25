const PeopleController = require('../app/controller/PeopleController');
const createValidation = require('../app/validation/people/create');

module.exports = (server, routes, prefix = '/api/v1/people') => {
    routes.post('/', createValidation, PeopleController.create);
    routes.get('/', PeopleController.getAll);
    routes.get('/:_id', PeopleController.getById);
    routes.put('/:_id', createValidation, PeopleController.update);
    routes.delete('/:_id', PeopleController.delete);

    server.use(prefix, routes);
}