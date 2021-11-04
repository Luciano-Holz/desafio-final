const PeopleRepository = require('../repository/PeopleRepository');

class AuthenticatorService {
  async auth(payload) {
    const result = await PeopleRepository.auth(payload);
    return result;
  }
}

module.exports = new AuthenticatorService();
