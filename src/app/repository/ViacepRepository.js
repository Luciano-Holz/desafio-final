const axios = require('axios');

class ViacepRepository {
  async viaCep(cep) {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
      return response.data;
    } catch (error) {
      throw new Error('Error');
    }
  }
}

module.exports = new ViacepRepository();
