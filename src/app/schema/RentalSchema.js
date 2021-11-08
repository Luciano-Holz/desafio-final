const mongoose = require('mongoose');

const RentalSchema = mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    unique: true
  },
  atividades: {
    type: String,
    required: true
  },
  endereco: [
    {
      cep: {
        type: String,
        unique: true,
        required: true
      },
      logradouro: {
        type: String
      },
      complemento: {
        type: String,
        required: false
      },
      bairro: {
        type: String
      },
      number: {
        type: Number,
        required: true
      },
      localidade: {
        type: String
      },
      uf: {
        type: String
      },
      isFilial: {
        type: Boolean,
        required: true
      }
    }
  ]
});

const Rental = mongoose.model('RentCompany', RentalSchema);

module.exports = Rental;
