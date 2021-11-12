class CnpjInvalid extends Error {
  constructor(cnpj) {
    const description = 'Bad Request';
    const message = `Invalid CNPJ ${cnpj}`;
    super(message);
    this.description = description;
    this.message = message;
    this.idErro = 2;
  }
}

module.exports = CnpjInvalid;
