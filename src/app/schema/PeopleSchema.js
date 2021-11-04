const mongoose = require('mongoose');
const crypto = require('crypto');
const mongoosePaginate = require('mongoose-paginate-v2');

const PeopleSchema = mongoose.Schema({
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
    required: true,
    select: false,
    set: (value) => crypto.createHash('md5').update(value).digest('hex')
  },
  habilitado: {
    type: String,
    required: true,
    enum: ['sim', 'nao']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

PeopleSchema.plugin(mongoosePaginate);

const People = mongoose.model('People', PeopleSchema);

module.exports = People;
