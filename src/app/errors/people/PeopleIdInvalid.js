class IdInvalid extends Error {
  constructor(id) {
    super();
    this.name = 'id';
    this.message = `Id: ${id} is Invalid.`;
  }
}

module.exports = IdInvalid;
