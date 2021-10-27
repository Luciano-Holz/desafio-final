const UserRepository = require('../repository/PeopleRepository');

class UserService {
    async auth(payload) {
        try {
            const result = await UserRepository.auth(payload);
            return result;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new UserService();