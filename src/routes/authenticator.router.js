const UserController = require('../app/controller/AuthenticatorController');
const AuthValidator = require('../app/validation/auth/create');

module.exports = (server, routes, prefix = '/api/v1/authenticate') => {
  routes.post('/', AuthValidator, UserController.auth);
  server.use(prefix, routes);
};
