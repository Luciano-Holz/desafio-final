const ReserveService = require('../service/ReserveService');

class ReserveController {
  async create(req, res) {
    try {
      const result = await ReserveService.create(req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ name: error.path, description: error.message });
    }
  }
}

module.exports = new ReserveController();
