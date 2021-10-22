const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    modelo: String,
    cor: String,
    ano: Number,
    acessorios: [
        {
        descricao: String
    }
    ] ,
    quantidadePassageiros: Number
})

const Carro = mongoose.model('Carro', CarSchema);

module.exports = Carro;