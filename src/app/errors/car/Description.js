class Description extends Error {
  constructor() {
    super();
    this.message = `Description already exists`;
    this.idErro = 3;
  }
}

module.exports = Description;
