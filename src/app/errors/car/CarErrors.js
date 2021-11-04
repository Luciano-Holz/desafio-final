class CarErrors extends Error {
  constructor() {
    const oi = Error.name;
    super();
    this.description = `${oi}`;
    this.name = `${oi}`;
    this.idErro = 3;
  }
}

module.exports = CarErrors;
