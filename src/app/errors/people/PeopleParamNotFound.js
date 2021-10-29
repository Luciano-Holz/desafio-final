class PeopleParamNotFound extends Error {
    constructor () {
        super('Params not found.');
        this.name = 'PeopleParamNotFound';
        this.idErro = 3;
    }
}

module.exports = PeopleParamNotFound;