class CarParamNotFound extends Error {
    constructor () {
        super('Car Params not found.');
        this.name = 'CarParamNotFound';
        this.idErro = 3;
    }
}

module.exports = CarParamNotFound;