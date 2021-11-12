const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const CarSchema = mongoose.Schema(
  {
    modelo: {
      type: String,
      required: true
    },
    cor: {
      type: String,
      required: true
    },
    ano: {
      type: Number,
      required: true
    },
    acessorios: [
      {
        descricao: {
          type: String,
          required: true
        }
      }
    ],
    quantidadePassageiros: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'car'
  }
);

CarSchema.plugin(mongoosePaginate);

const Carro = mongoose.model('car', CarSchema);

module.exports = Carro;
