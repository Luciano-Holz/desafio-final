const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
//const authMiddleware = require('../app/middlewares/auth');
const idValidation = require('../app/validation/car/idValidation');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/',createValidation , CarController.create);
    routes.get('/', CarController.getAll);
    routes.get('/:_id', idValidation, CarController.getById); 
    routes.put('/:_id', idValidation,  createValidation , CarController.update); 
    routes.delete('/:_id', idValidation,  CarController.delete); 
  
    server.use(prefix, routes);
}
