class RentalNotFound extends Error {
  constructor(id) {
    super();
    this.message = `Id ${id}' is not found`;
    this.idErro = 2;
  }
}

module.exports = RentalNotFound;
