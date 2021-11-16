const dotenv = require('dotenv');

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

module.exports = {
  database: {
    DB_CONNECTION: process.env.DB_CONNECTION
  }
};
