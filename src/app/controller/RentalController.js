const { paginateSerialize, serialize } = require('../serialize/RentalSerialize');
const RentalService = require('../service/RentalService');

class RentalController {
  async create(req, res) {
    try {
      const result = await RentalService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          description: 'Conflict',
          name: `${Object.keys(error.keyValue)} ${Object.values(error.keyValue)} already in use`
        });
      }
      return res.status(400).json({ description: error.description, name: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await RentalService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, name: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await RentalService.getById(req.params._id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, name: error.message });
    }
  }

  async update(req, res) {
    try {
      const { _id } = req.params;
      const result = await RentalService.update(_id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).json({
          description: 'Conflict',
          name: `${Object.keys(error.keyValue)} ${Object.values(error.keyValue)} already in use`
        });
      }
      return res.status(400).json({ description: error.path, name: error.message });
    }
  }

  async delete(req, res) {
    try {
      await RentalService.delete(req.params._id);
      return res.status(204).end();
    } catch (error) {
      if (error.idErro === 2) return res.status(404).json({ description: error.path, name: error.message });
      return res.status(400).json({ description: error.path, name: error.message });
    }
  }
}

module.exports = new RentalController();
