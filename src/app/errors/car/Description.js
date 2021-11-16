class Description extends Error {
  constructor() {
    super();
    this.message = `Description already exists`;
  }
}

module.exports = Description;
