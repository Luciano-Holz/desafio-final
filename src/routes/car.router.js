const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
// const authMiddleware = require('../app/middlewares/auth');
const IdValidation = require('../app/validation/car/IdValidation');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', createValidation, CarController.create);
  routes.get('/', CarController.getAll);
  routes.get('/:_id', IdValidation, CarController.getById);
  routes.put('/:_id', IdValidation, createValidation, CarController.update);
  routes.delete('/:_id', IdValidation, CarController.delete);
  routes.patch('/:_idCar/acessorios/:_idAcessorio', IdValidation, CarController.patch);

  server.use(prefix, routes);
};
