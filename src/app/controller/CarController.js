const CarService = require('../service/CarService');

class CarController {
    async create(req, res) {
        const results = await CarService.create(req.body);
        const  { _id, __v, ...result} = results.toObject();//
        
        return res.status(201).json(result);
    }
    async getAll(req, res) {
        const result = await CarService.getAll(req.query);
        const {pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage, ...veiculos} = result;
        console.log(veiculos)
        return res.status(200).json(veiculos);
    }
    async getById(req, res) {
        const results = await CarService.getById(req.params._id);
        const  { __v, ...result} = results.toObject()
        return res.status(200).json(result)
    }
    async update(req, res) {
        const { _id } = req.params;
        const  results = await CarService.update(_id, req.body);
        const  { __v, ...result} = results.toObject()
        return res.status(200).json(result);
      
    }
    async delete(req, res) {
        await CarService.delete(req.params._id);
        return res.status(204).end();
    }
}

module.exports = new CarController();