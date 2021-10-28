
const CarSchema = require('../schema/CarSchema');

class CarRepository {
    async create(payload) {
        return CarSchema.create(payload);
    }
    async getAll(queryParams) {
        const { page = 1, limit = 100, ...query } = queryParams;
        return await CarSchema.paginate(
            {...query}, 
        {
            limit: Number(limit), 
            page: Number(page),
            skip: (Number(page) -1) * Number(limit)
        });
    }
    async getById(_id) {
        return await CarSchema.findById({_id});
    }
    async update(_id, payload) {
        return await CarSchema.findByIdAndUpdate({_id}, payload);
    }
    async delete(_id) {
        return await CarSchema.findByIdAndDelete({_id});
    }
}

module.exports = new CarRepository();