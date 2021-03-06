const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const RentalSchema = mongoose.Schema(
  {
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
  },
  {
    timestamps: true,
    collection: 'rental'
  }
);

RentalSchema.plugin(mongoosePaginate);

const Rental = mongoose.model('rental', RentalSchema);

module.exports = Rental;
