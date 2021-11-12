class EmailIsRegisted extends Error {
  constructor() {
    super(`Email is already registed!`);
    this.description = 'email';
    this.name = 'Email is alredy registed!';
  }
}

module.exports = EmailIsRegisted;
