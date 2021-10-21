//file by routes car
const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/',createValidation , CarController.create);
    routes.get('/', CarController.find);
    //routes.get('/:_id', CarController.findOne);
  
    server.use(prefix, routes);
}
