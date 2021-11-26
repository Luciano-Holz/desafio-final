const { serialize, paginateSerialize } = require('../serialize/FleetSerialize');
const FleetService = require('../service/FleetService');

class FleetController {
  async create(req, res) {
    try {
      const { _id } = req.params;
      const result = await FleetService.create(_id, req.body);
      return res.status(201).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getAll(req, res) {
    try {
      const result = await FleetService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getById(req, res) {
    try {
      const { _id, _idFleet } = req.params;
      const result = await FleetService.getById(_id, _idFleet);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async update(req, res) {
    try {
      const { _id, _idFleet } = req.params;
      const result = await FleetService.update(_id, _idFleet, req.body);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async delete(req, res) {
    try {
      const { _idFleet } = req.params;
      await FleetService.delete(_idFleet);
      return res.status(204).end();
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }
}

module.exports = new FleetController();
