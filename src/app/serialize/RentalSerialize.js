const serialize = ({ _id, nome, cnpj, atividades, endereco }) => ({
  _id,
  nome,
  cnpj,
  atividades,
  endereco
});

const paginateSerialize = ({ docs, limit, pagingCounter, totalDocs, totalPages }) => ({
  locadoras: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
