class PeopleNotFound extends Error {
    constructor (id) {
        const mensagem = `People '${id}' not .`;
        super(mensagem);
        this.message = 'PeopleNotFound';
        this.idErro = 2;
    }
}

module.exports = PeopleNotFound;
