const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const authenticate = async (req, res, next) => {
  try {
    const authReader = req.headers.authorization;
    if (!authReader) return res.status(401).send({ error: 'No token provided.' });

    const parts = authReader.split(' ');
    if (parts.length !== 2) return res.status(401).send({ error: 'Token error.' });

    const [, token] = parts;
    jwt.verify(token, process.env.API_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json(
      error.details.map((detail) => ({
        name: detail.path.join('.'),
        description: detail.message
      }))
    );
  }
};

module.exports = authenticate;
