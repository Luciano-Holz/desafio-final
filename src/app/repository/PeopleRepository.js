const PeopleSchema = require('../schema/PeopleSchema');
const Repository = require('./Repository');

class PeopleRepository extends Repository {
  constructor() {
    super(PeopleSchema);
  }

  async auth({ email, senha }) {
    const result = await PeopleSchema.findOne({ email, senha });
    return result;
  }
}
module.exports = new PeopleRepository();
