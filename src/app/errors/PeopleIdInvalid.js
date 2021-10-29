class IdInvalid extends Error {
    constructor (_id) {
        const mensagem = `Id '${_id}' is inválid.`;
        super(mensagem);
        this.message = 'IdInvalido';
        this.idErro = 1;
    }
}

module.exports = IdInvalid;