const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const authMiddleware = require('../app/middlewares/auth');

module.exports = (server, routes, prefix = '/api/v1/car') => {
    routes.post('/',createValidation , CarController.create);
    routes.get('/', CarController.getAll);
    routes.get('/:_id',authMiddleware, CarController.getById); 
    routes.put('/:_id', authMiddleware, createValidation , CarController.update); 
    routes.delete('/:_id',authMiddleware, CarController.delete); 
  
    server.use(prefix, routes);
}
