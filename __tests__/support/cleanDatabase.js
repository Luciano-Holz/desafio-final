const database = require('../../src/infra/database/mongo');

const cleanDatabase = async () => {
  const db = await database;
  // eslint-disable-next-line no-restricted-syntax
  for (const collection of Object.keys(db.connection.collections)) {
    db.connection.collections[collection].deleteMany({});
  }
};
module.exports = cleanDatabase;
