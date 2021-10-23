const PeopleController = require('../app/controller/PeopleController');
const createValidation = require('../app/validation/people/create');

module.exports = (server, routes, prefix = '/api/v1/people') => {
    routes.post('/', createValidation, PeopleController.create);


    server.use(prefix, routes);
}