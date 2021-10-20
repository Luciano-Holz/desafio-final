//file with class Carcontroller
const CarService = require('../service/CarService');

class CarController {
    async create(req, res) {
        const results = await CarService.create(req.body);
        const  { modelo, cor, ano, acessorios, quantidadePassageiros } = results;
        const result = { modelo, cor, ano, acessorios, quantidadePassageiros };
        return res.status(201).json(result);
    }
}

module.exports = new CarController();