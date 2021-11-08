const { paginateSerialize, serialize } = require('../serialize/RentalSerialize');
const RentalService = require('../service/RentalService');

class RentalController {
  async create(req, res) {
    try {
      const result = await RentalService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ description: error.path, name: error.message });
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
}

module.exports = new RentalController();
