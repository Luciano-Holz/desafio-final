//file with schema  from table car
const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    modelo: String,
    cor: String,
    ano: Date,
    acessorios: {
        descricao: String
    },
    quantidadePassageiros: Number
})

const Carro = mongoose.model('Carro', CarSchema);

module.exports = Carro;