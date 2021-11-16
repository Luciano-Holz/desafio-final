class CnpjInvalid extends Error {
  constructor(cnpj) {
    super();
    this.description = `Invalid CNPJ ${cnpj}`;
  }
}

module.exports = CnpjInvalid;
