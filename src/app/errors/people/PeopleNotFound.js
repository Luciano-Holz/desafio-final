class PeopleNotFound extends Error {
  constructor(id) {
    super();
    this.message = `People 'ID: ${id}' not found`;
  }
}

module.exports = PeopleNotFound;
