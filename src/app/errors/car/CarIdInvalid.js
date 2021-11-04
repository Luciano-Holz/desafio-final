class CarIdInvalid extends Error {
  constructor(id) {
    super();
    this.message = `Id: ${id} is Invalid.`;
    this.idErro = 1;
  }
}

module.exports = CarIdInvalid;
