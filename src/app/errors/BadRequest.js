class BadRequest extends Error {
  constructor(name, description) {
    super(name, description);
    this.name = name;
    this.description = description;
    this.status = 400;
  }
}

module.exports = BadRequest;
