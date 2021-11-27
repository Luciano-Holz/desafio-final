const { serialize, paginateSerialize } = require('../serialize/PeopleSerialize');
const PeopleService = require('../service/People');

class PeopleController {
  async create(req, res) {
    try {
      const result = await PeopleService.create(req.body);
      return res.status(201).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getAll(req, res) {
    try {
      const result = await PeopleService.getAll(req.query);
      return res.status(200).json(paginateSerialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async getById(req, res) {
    try {
      const result = await PeopleService.getById(req.params._id);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async update(req, res) {
    try {
      const { _id } = req.params;
      await PeopleService.update(_id, req.body);
      const result = await PeopleService.getById(req.params._id);
      return res.status(200).json(serialize(result));
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }

  async delete(req, res) {
    try {
      await PeopleService.delete(req.params._id);
      return res.status(204).end();
    } catch ({ name, description, status }) {
      return res.status(status).json({ name, description });
    }
  }
}

module.exports = new PeopleController();
