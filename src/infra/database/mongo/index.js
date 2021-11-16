const mongoose = require('mongoose');

const config = require('../../../app/config/config');

class Database {
  constructor() {
    this.connect();
  }

  connect() {
    return mongoose.connect(config.database.DB_CONNECTION);
  }

  disconnect() {
    return mongoose.connection.close();
  }
}

module.exports = new Database().connect();
