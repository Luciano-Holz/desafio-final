const serialize = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,

  habilitado
});

const paginateSerialize = ({ docs, limit, pagingCounter, totalDocs, totalPages }) => ({
  people: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
