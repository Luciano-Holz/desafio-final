const { paginateSerialize, serialize } = require('../serialize/CarSerielize');
const CarService = require('../service/CarService');

class CarController {
    async create(req, res) { 
        try {
            const result = await CarService.create(req.body);
            return res.status(201).json(serialize(result));
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async getAll(req, res) {
        try {
            const result = await CarService.getAll(req.query);
            return res.status(200).json(paginateSerialize(result));
        } catch (error) {
            return res.status(400).json({message: error.message});
        } 
    }
    async getById(req, res) {
        try {
            const result = await CarService.getById(req.params._id);
            return res.status(200).json(serialize(result))
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async update(req, res) {
        try {
            const { _id } = req.params;
            const  result = await CarService.update(_id, req.body);
            return res.status(200).json(serialize(result));
        } catch (error) {
            return res.status(400).json({message: error.message});
        }
    }
    async delete(req, res) {
        try {
           const result = await CarService.delete(req.params._id);
            return res.status(204).end(); 
        } catch (error) {
            return res.status(400).json({message: error.message});
        }  
    }
}

module.exports = new CarController();