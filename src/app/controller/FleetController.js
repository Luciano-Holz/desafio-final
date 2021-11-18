const { serialize } = require('../serialize/FleetSerialize');
const FleetService = require('../service/FleetService');

class FleetController {
  async create(req, res) {
    try {
      const { _id } = req.params;
      const result = await FleetService.create(_id, req.body);
      return res.status(201).json(serialize(result));
    } catch (error) {
      return res.status(400).json({ name: error.path, description: error.message });
    }
  }
}

module.exports = new FleetController();
