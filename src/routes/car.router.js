const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/',createValidation , CarController.create);
    routes.get('/', CarController.getAll);
    routes.get('/:_id', CarController.getById); 
    routes.put('/:_id',createValidation , CarController.update); 
    routes.delete('/:_id', CarController.delete); 
  
    server.use(prefix, routes);
}
