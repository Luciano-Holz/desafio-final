class NotFound extends Error {
  constructor(name, description) {
    super(name, description);
    this.name = name;
    this.description = description;
    this.status = 404;
  }
}

module.exports = NotFound;
