class IsFilialExists extends Error {
  constructor() {
    super(`IsFilial false is possible only one`);
    this.description = 'isFilial';
    this.name = 'IsFilial false is possible only one';
  }
}

module.exports = IsFilialExists;
