const cpfPattern = () => /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const cnpjPattern = () => /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
const idPattern = () => /^[0-9a-fA-F]{24}$/;

module.exports = {
  cpfPattern,
  cnpjPattern,
  idPattern
};
