const CarService = require('../service/CarService');

class CarController {
    async create(req, res) {
        const results = await CarService.create(req.body);
        const  { modelo, cor, ano, acessorios, quantidadePassageiros } = results;
        const result = { modelo, cor, ano, acessorios, quantidadePassageiros };
        return res.status(201).json(result);
    }
    async getAll(req, res) {
        const veiculos = await CarService.getAll(req.query);
        return res.status(200).json({veiculos});
    }
    async getById(req, res) {
        const results = await CarService.getById(req.params._id);
        return res.status(200).json(results)
    }
    async update(req, res) {
        const { _id } = req.params;
        const  result = await CarService.update(_id, req.body);
        return res.status(200).json(result);
      
    }
    async delete(req, res) {
        await CarService.delete(req.params._id);
        return res.status(204).end();
    }
}

module.exports = new CarController();