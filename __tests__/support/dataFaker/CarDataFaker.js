const dataFaker = require('./dataFaker');

const generateCarJson = (count = 1) => {
  const objs = [];
  for (let index = 0; index < count; index++) {
    objs.push({
      modelo: dataFaker.name({ middle: true }),
      cor: dataFaker.string({ length: 10, pool: 'abcdefghijlmnoprstuvxz' }),
      ano: dataFaker.year({ min: 1950, max: 2022 }),
      acessorios: dataFaker.array([{}]),
      quantidadePassageiros: dataFaker.natural({ min: 1, max: 7 })
    });
  }
  return count === 1 ? objs[0] : objs;
};

module.exports = generateCarJson;
