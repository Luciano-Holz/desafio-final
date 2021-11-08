const validateCpf = (payload) => {
  const value = payload.cpf;
  if (!value) return false;
  const validTypes = typeof value === 'string' || Number.isInteger(value) || Array.isArray(value);
  if (!validTypes) return false;
  const numbers = value.toString().match(/\d/g).map(Number);
  if (numbers.length !== 11) return false;
  const items = [...new Set(numbers)];
  if (items.length === 1) return false;
  const base = numbers.slice(0, 9);
  const digits = numbers.slice(9);
  const calc = (n, i, x) => n * (x - i);
  const sum = (r, n) => r + n;
  const digit = (n) => {
    const rest = n % numbers.length;
    return rest < 2 ? 0 : numbers.length - rest;
  };
  const calc0 = base.map((n, i) => calc(n, i, numbers.length - 1)).reduce(sum, 0);
  const digit0 = digit(calc0);
  if (digit0 !== digits[0]) return false;
  const calc1 = base
    .concat(digit0)
    .map((n, i) => calc(n, i, numbers.length))
    .reduce(sum, 0);
  const digit1 = digit(calc1);
  return digit1 === digits[1];
};
module.exports = { validateCpf };
