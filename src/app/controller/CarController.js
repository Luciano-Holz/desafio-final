const CarService = require('../service/CarService');

class CarController {
    async create(req, res) {
        const results = await CarService.create(req.body);
        const  { modelo, cor, ano, acessorios, quantidadePassageiros } = results;
        const result = { modelo, cor, ano, acessorios, quantidadePassageiros };
        return res.status(201).json(result);
    }
    async find(req, res) {
        const results = await CarService.find();
        return res.status(200).json(results)
    }
    async findOne(req, res) {
        const results = await CarService.findOne(req.params._id);
        return res.status(200).json(results)
    }
    async deleteOne(req, res) {
        const results = await CarService.deleteOne(req.params._id);
        return res.status(204).end();
    }
}

module.exports = new CarController();