const { serialize, paginateSerialize } = require('../serialize/ReserveSerialize');
const ReserveService = require('../service/ReserveService');

class ReserveController {
  async create(req, res) {
    try {
      const { _id } = req.params;
      const result = await ReserveService.create(_id, req.body);
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

  async update(req, res) {
    try {
      const { _id } = req.params;
      const result = await ReserveService.update(_id, req.body);
      return res.status(200).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ name: error.path, description: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ReserveService.delete(req.params._id);
      return res.status(204).end();
    } catch (error) {
      return res.status(400).json({ name: error.path, description: error.message });
    }
  }
}

module.exports = new ReserveController();
