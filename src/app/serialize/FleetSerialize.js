const serialize = ({ _id, id_carro, id_locadora, status, valor_diaria, placa }) => ({
  _id,
  id_carro,
  id_locadora,
  status,
  valor_diaria,
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
