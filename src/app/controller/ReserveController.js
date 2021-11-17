const { serialize, paginateSerialize } = require('../serialize/ReserveSerialize');
const ReserveService = require('../service/ReserveService');

class ReserveController {
  async create(req, res) {
    try {
      const result = await ReserveService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ name: error.path, description: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const result = await ReserveService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch (error) {
      return res.status(400).json({ name: error.path, description: error.message });
    }
  }

  async getById(req, res) {
    try {
      const result = await ReserveService.getById(req.params._id);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ name: error.path, description: error.message });
    }
  }
}

module.exports = new ReserveController();
