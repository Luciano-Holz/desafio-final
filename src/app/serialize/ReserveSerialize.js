const moment = require('moment');

const serialize = ({ _id, id_user, data_inicio, data_fim, id_carro, id_locadora, valor_final }) => ({
  _id,
  id_user,
  data_inicio: moment(data_inicio).utc().format('DD/MM/YYYY'),
  data_fim: moment(data_fim).utc().format('DD/MM/YYYY'),
  id_carro,
  id_locadora,
  valor_final
});

const paginateSerialize = ({ docs, limit, pagingCounter, totalDocs, totalPages }) => ({
  reservas: docs.map(serialize),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = { serialize, paginateSerialize };
