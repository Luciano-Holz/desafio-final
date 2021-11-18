const serialize = ({ _id, id_carro, status, id_locacao, valor_diaria, id_locadora, placa }) => ({
  _id,
  id_carro,
  status,
  id_locacao,
  valor_diaria,
  id_locadora,
  placa
});

const paginateSerialize = ({ docs, limit, pagingCounter, totalDocs, totalPages }) => ({
  frota: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
