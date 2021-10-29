class CarNotFound extends Error {
    constructor () {
        super('Car not found.');
        this.name = 'CarNotFound';
        this.idErro = 2;
    }
}

module.exports = CarNotFound;