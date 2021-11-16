class CpfIsRegisted extends Error {
  constructor() {
    super(`Cpf is already registed!`);
    this.name = 'cpf';
    this.description = 'Cpf is alredy registed!';
  }
}

module.exports = CpfIsRegisted;
