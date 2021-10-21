//file with schema  from table car
const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    modelo: String,
    cor: String,
    ano: Number,
    acessorios: {
        descricao1: String,
        descricao2: String,
        descricao3: String
    },
    quantidadePassageiros: Number
})

const Carro = mongoose.model('Carro', CarSchema);

module.exports = Carro;