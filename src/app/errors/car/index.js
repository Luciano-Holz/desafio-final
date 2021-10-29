const CarParamNotFound = require('./CarParamNotFound');
const CarNotFound = require('./CarNotFound');
const NotAuthenticate = require('./NotAuthenticate');

module.exports = async(error, req, res, next) => {
    let statusCode = 500;

    if(error instanceof CarParamNotFound || error instanceof CarNotFound) {
        statusCode = 404;
    }

    if(error instanceof NotAuthenticate) {
        statusCode = 400;
    }

    res.status(statusCode).send(JSON.stringify({ message: error.message, Error_id: error.idErro }));
}