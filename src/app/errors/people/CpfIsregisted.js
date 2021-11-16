class CpfIsRegisted extends Error {
  constructor() {
    super();
    this.message = 'Cpf is alredy registed!';
  }
}

module.exports = CpfIsRegisted;
