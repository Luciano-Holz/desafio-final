const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    const authReader = req.headers.Authorization;
    if (!authReader) return res.status(401).send({ name: 'Token', message: 'Token not provided.' });

    const parts = authReader.split(' ');
    if (parts.length !== 2) return res.status(401).send({ name: 'Token', message: 'Token malformated.' });

    const [, token] = parts;
    jwt.verify(token, process.env.API_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json(
      error.details.map((detail) => ({
        name: detail.path[0],
        description: detail.message
      }))
    );
  }
};

module.exports = authenticate;
