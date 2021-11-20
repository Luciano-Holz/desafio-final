const UserService = require('../service/AuthenticatorService');

class UserController {
  async auth(req, res) {
    try {
      const result = await UserService.auth(req.body);
      return res.status(200).json(result);
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }
}

module.exports = new UserController();
