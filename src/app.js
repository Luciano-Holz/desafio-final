//file with the class App
const express = require('express');

class App {

    constructor() {
        this.server = express();
        this.middlewares();
    }

    middlewares() {
        this.server.use(express.json());
    }
}

module.exports = new App().server;