const { Router } = require('express');
const car = require('../routes/car.router');
const people = require('../routes/people.router');
const auth = require('../routes/authenticator.router');

module.exports = server => {
    server.use((req, res, next) => {
        car(server, new Router());
        people(server, new Router());
        auth(server, new Router());
        next();
    });
}