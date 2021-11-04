const { paginateSerialize, serialize } = require('../serialize/CarSerialize');
const CarService = require('../service/CarService');

class CarController {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await CarService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await CarService.getById(req.params._id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { _id } = req.params;
      const result = await CarService.update(_id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, error: error.message });
    }
  }

  async delete(req, res) {
    try {
      await CarService.delete(req.params._id);
      return res.status(204).end();
    } catch (error) {
      if (error.idErro === 2) return res.status(404).json({ description: error.path, name: error.message });
      return res.status(400).json({ description: error.path, error: error.message });
    }
  }

  async patch(req, res) {
    try {
      const { _idCar, _idAcessorio } = req.params;
      const result = await CarService.patch(_idCar, _idAcessorio, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, error: error.message });
    }
  }
}

module.exports = new CarController();
