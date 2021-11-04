class PeopleNotFound extends Error {
  constructor(id) {
    super();
    this.message = `People 'ID: ${id}' not found`;
    this.idErro = 2;
  }
}

module.exports = PeopleNotFound;
