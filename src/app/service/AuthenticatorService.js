const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const NotFound = require('../errors/NotFound');
const PeopleRepository = require('../repository/PeopleRepository');
const BadRequest = require('../errors/BadRequest');

dotenv.config();

class AuthenticatorService {
  async auth(payload) {
    const { senha } = payload;
    const people = await PeopleRepository.auth(payload.email);

    if (!people) throw new NotFound('email', 'Email do not exists in database');

    if (!(await bcrypt.compare(senha, people.senha))) throw new BadRequest('senha', 'Senha is incorrect.');

    const { email, habilitado } = people;

    const token = jwt.sign({ email, habilitado }, process.env.API_SECRET, { expiresIn: 86400 });
    const response = { email, habilitado, token };
    return response;
  }
}

module.exports = new AuthenticatorService();
