const PeopleRepository = require('../repository/PeopleRepository');
const moment = require('moment');

class PeopleService {
    async create(payload) {

            const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
            const dataT = moment().diff(formatData, 'years');
            if(dataT < 18) 
               throw Error('age under 18 years');
            payload.data_nascimento = formatData;
            const results = await PeopleRepository.create(payload);
            return results;
            
    }
    async getAll() {
        try {
            const result = await PeopleRepository.getAll();
            return result;
        } catch (error) {
            return error;
        }
    }
    async getById(_id) {
        try {
            const result = await PeopleRepository.getById(_id);
            return result;
        } catch (error) {
            return error;
        }
    }
    async update(_id, payload) {
        try {
            const result = PeopleRepository.update(_id, payload);
            return result;
        } catch (error) {
            return error;
        }
    }
    async delete(_id) {
        try {
            const result = PeopleRepository.delete(_id);
            return result;
        } catch (error) {
            return error;
        }
    }
}

module.exports = new PeopleService();