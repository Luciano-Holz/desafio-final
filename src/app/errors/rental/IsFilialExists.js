class IsFilialExists extends Error {
  constructor() {
    super();
    this.message = 'IsFilial false is possible only one';
  }
}

module.exports = IsFilialExists;
