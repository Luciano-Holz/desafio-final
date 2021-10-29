const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
});

CarSchema.plugin(mongoosePaginate);

const Carro = mongoose.model('Car', CarSchema);

module.exports = Carro;