
const IdInvalid = require('../PeopleIdInvalid')
const PeopleNotFound = require('./PeopleNotFound');
const PeopleParamNotFound = require('./PeopleParamNotFound');

module.exports = async(error, req, res, next) => {
    let statusCode = 500;

    if(error instanceof PeopleParamNotFound || error instanceof PeopleNotFound || error instanceof IdInvalid) {
        statusCode = 404;
    }

    if(error instanceof IdInvalid) {
        statusCode = 400;
    }
    res.status(statusCode).send(JSON.stringify({ message: error.message, Error_id: error.idErro }));
}