const UserController = require('../app/controller/AuthenticatorController');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
    routes.post('/', UserController.auth);
    server.use(prefix, routes);
}
