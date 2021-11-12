class CpfIsRegisted extends Error {
  constructor() {
    super(`Cpf is already registed!`);
    this.description = 'cpf';
    this.name = 'Cpf is alredy registed!';
  }
}

module.exports = CpfIsRegisted;
