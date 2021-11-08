const swaggerUi = require('swagger-ui-express');
const SwaggerDocs = require('../../swagger.json');

module.exports = (server, routes, prefix = '/api/v1/api-docs') => {
  routes.get('/', swaggerUi.serve, swaggerUi.setup(SwaggerDocs));

  server.use(prefix, routes);
};
