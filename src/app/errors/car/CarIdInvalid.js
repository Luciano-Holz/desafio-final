class CarIdInvalid extends Error {
  constructor(id) {
    super();
    this.message = `Id: ${id} is Invalid.`;
  }
}

module.exports = CarIdInvalid;
