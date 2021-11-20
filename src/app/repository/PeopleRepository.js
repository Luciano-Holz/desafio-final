const PeopleSchema = require('../schema/PeopleSchema');
const Repository = require('./Repository');

class PeopleRepository extends Repository {
  constructor() {
    super(PeopleSchema);
  }

  async auth(email) {
    const result = await PeopleSchema.findOne({ email });
    return result;
  }
}
module.exports = new PeopleRepository();
