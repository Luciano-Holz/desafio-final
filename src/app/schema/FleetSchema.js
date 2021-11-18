const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const FleetSchema = mongoose.Schema(
  {
    id_carro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'car',
      required: true
    },
    status: {
      type: String,
      required: true
    },
    id_locacao: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'reserve',
      required: true
    },
    valor_diaria: {
      type: Number,
      required: true
    },
    id_locadora: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'rental',
      required: true
    },
    placa: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    collection: 'reserve'
  }
);

FleetSchema.plugin(mongoosePaginate);

const Fleet = mongoose.model('fleet', FleetSchema);

module.exports = Fleet;
