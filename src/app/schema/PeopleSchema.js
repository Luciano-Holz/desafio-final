const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const mongoosePaginate = require('mongoose-paginate-v2');

const PeopleSchema = mongoose.Schema(
  {
    nome: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      unique: true,
      required: true
    },
    data_nascimento: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true
    },
    senha: {
      type: String,
      required: true
    },
    habilitado: {
      type: String,
      required: true,
      enum: ['sim', 'nao']
    }
  },
  {
    timestamps: true,
    collection: 'people'
  }
);

PeopleSchema.pre('save', async function encryptPass(next) {
  const encriptPassword = await bcrypt.hash(this.senha, 10);
  this.senha = encriptPassword;
  next();
});

PeopleSchema.plugin(mongoosePaginate);

const People = mongoose.model('people', PeopleSchema);

module.exports = People;
