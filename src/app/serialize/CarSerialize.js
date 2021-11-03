const serialize = ({ _id, modelo, cor, ano, acessorios, quantidadePassageiros }) => ({
  _id,
  modelo,
  cor,
  ano,
  acessorios,
  quantidadePassageiros
});

const paginateSerialize = ({ docs, limit, pagingCounter, totalDocs, totalPages }) => ({
  veiculos: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
