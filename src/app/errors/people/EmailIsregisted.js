class EmailIsRegisted extends Error {
  constructor() {
    super();
    this.message = 'Email is alredy registed!';
  }
}

module.exports = EmailIsRegisted;
