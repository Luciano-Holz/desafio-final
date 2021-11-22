const { paginateSerialize, serialize } = require('../serialize/CarSerialize');
const CarService = require('../service/CarService');

class CarController {
  async create(req, res) {
    try {
      const result = await CarService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getAll(req, res) {
    try {
      const result = await CarService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getById(req, res) {
    try {
      const result = await CarService.getById(req.params._id);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async update(req, res) {
    try {
      const { _id } = req.params;
      const result = await CarService.update(_id, req.body);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async delete(req, res) {
    try {
      await CarService.delete(req.params._id);
      return res.status(204).end();
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async patch(req, res) {
    try {
      const { _id, _idAcessorio } = req.params;
      const result = await CarService.patch(_id, _idAcessorio, req.body);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }
}

module.exports = new CarController();
