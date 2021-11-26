const { serialize, paginateSerialize } = require('../serialize/ReserveSerialize');
const ReserveService = require('../service/ReserveService');

class ReserveController {
  async create(req, res) {
    try {
      const { _id } = req.params;
      const result = await ReserveService.create(_id, req.body);
      return res.status(201).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getAll(req, res) {
    try {
      const result = await ReserveService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getById(req, res) {
    try {
      const { _id, _idReserve } = req.params;
      const result = await ReserveService.getById(_id, _idReserve);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async update(req, res) {
    try {
      const { _id, _idReserve } = req.params;
      const result = await ReserveService.update(_id, _idReserve, req.body);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async delete(req, res) {
    try {
      const { _idReserve } = req.params;
      await ReserveService.delete(_idReserve);
      return res.status(204).end();
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }
}

module.exports = new ReserveController();
