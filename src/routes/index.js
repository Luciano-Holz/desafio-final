//file to create routes
const { Router } = require('express');

module.exports = server => {
    server.use((req, res, next) => {
        car(server, new Router());
        next();
    });
}