const CarController = require('../app/controller/CarController');
const createValidation = require('../app/validation/car/create');
const authMiddleware = require('../app/middlewares/auth');
const IdValidation = require('../app/validation/idValidation');
const descriptionValidation = require('../app/validation/car/descricaoValidation');

module.exports = (server, routes, prefix = '/api/v1/car') => {
  routes.post('/', authMiddleware, createValidation, CarController.create);
  routes.get('/', authMiddleware, CarController.getAll);
  routes.get('/:_id', authMiddleware, IdValidation, CarController.getById);
  routes.put('/:_id', authMiddleware, IdValidation, createValidation, CarController.update);
  routes.delete('/:_id', authMiddleware, IdValidation, CarController.delete);
  routes.patch('/:_id/acessorios/:_idAcessorio', authMiddleware, descriptionValidation, CarController.patch);

  server.use(prefix, routes);
};
