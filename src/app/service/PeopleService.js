const PeopleRepository = require('../repository/PeopleRepository');
const PeopleIdInvalid = require('../errors/people/PeopleIdInvalid');
const PeopleNotFound = require('../errors/people/PeopleNotFound');
const { cpf } = require('cpf-cnpj-validator');
const moment = require('moment');

class PeopleService {
    async create(payload) {
        const cpfNew = payload.cpf;
        const cpfValid = cpf.isValid(payload.cpf);
        const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');  
        const dataT = moment().diff(formatData, 'years');
        if(dataT < 18) 
           throw Error('Age under 18 years');
        if(!cpfValid)
            throw Error('Cpf Invalid');
        payload.cpf = cpfNew;
        payload.data_nascimento = formatData;
        const results = await PeopleRepository.create(payload);
        if(!results)
            throw new PeopleNotFound();
        return results;
    }
    async getAll() {
        const result = await PeopleRepository.getAll();
        const formatData = moment(result.data_nascimento).format('DD/MM/YYYY');
        result.data_nascimento = formatData;
        return result;
    }
    async getById(_id) {
        const result = await PeopleRepository.getById(_id);
        if(!result)
            throw new PeopleIdInvalid(_id);
        return result;
    }
    async update(_id, payload) {
        const formatData = moment(payload.data_nascimento, 'DD/MM/YYYY').format('YYYY-MM-DD');
        const dataT = moment().diff(formatData, 'years');
        if(dataT < 18) 
            throw Error('age under 18 years');
        payload.data_nascimento = formatData;
        const result = PeopleRepository.update(_id, payload);
        if(!result) 
            throw new PeopleIdInvalid();
        return result;
    }
    async delete(_id) {
        const result = await PeopleRepository.delete(_id);
        if(!result) {
            throw new PeopleIdInvalid(_id);
        }
        return result;
    }
}

module.exports = new PeopleService();