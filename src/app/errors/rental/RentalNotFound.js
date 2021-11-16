class RentalNotFound extends Error {
  constructor(id) {
    super();
    this.message = `Id ${id}' is not found`;
  }
}

module.exports = RentalNotFound;
