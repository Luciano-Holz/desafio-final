//file with schema  from table car
const mongoose = require('mongoose');

const CarSchema = mongoose.Schema({
    model: String,
    color: String,
    year: Date,
    accessories: [
        {
            description: String,
            description: String,
            description: String
        }
    ],
    quantityPassengers: Number
})

const Car = mongoose.model('Car', CarSchema);

module.exports = Car;