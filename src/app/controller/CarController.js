const CarService = require('../service/CarService');

class CarController {
    async create(req, res) { 
        try {
            const results = await CarService.create(req.body);
            const  { _id, __v, ...result} = results.toObject();//
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async getAll(req, res) {
        try {
            const result = await CarService.getAll(req.query);
            const {pagingCounter, hasPrevPage, hasNextPage, prevPage, nextPage, ...veiculos} = result;
            return res.status(200).json({veiculos});
        } catch (error) {
            return res.status(400).json({message: error.message});
        } 
    }
    async getById(req, res) {
        try {
            const results = await CarService.getById(req.params._id);
            const  { __v, ...result} = results.toObject();
            return res.status(200).json(result)
        } catch (error) {
            return res.status(400).json('Id Invalid');
        }
    }
    async update(req, res) {
        try {
             const { _id } = req.params;
            const  results = await CarService.update(_id, req.body);
            const  { __v, ...result} = results.toObject();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json('Id Invalid');
        }
    }
    async delete(req, res) {
        try {
           const result = await CarService.delete(req.params._id);
            return res.status(204).end(); 
        } catch (error) {
            return res.status(400).json('Id Invalid');
        }  
    }
}

module.exports = new CarController();