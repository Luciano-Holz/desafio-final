const { Router } = require('express');
const car = require('./car.router');
const people = require('./people.router');
const auth = require('./authenticator.router');
const rental = require('./rental.router');
const swagger = require('./swagger.router');

module.exports = (server) => {
  server.use((req, res, next) => {
    car(server, new Router());
    people(server, new Router());
    auth(server, new Router());
    rental(server, new Router());
    swagger(server, new Router());
    next();
  });
};
