const serialize = ({_id, modelo, cor, ano, acessorios, quantidadePassageiros}) => {
    return {_id, modelo, cor, ano, acessorios, quantidadePassageiros}
}

const paginateSerialize = ({docs, limit, pagingCounter, totalDocs, totalPages}) => {
    return {
        veiculos: docs.map(serialize), 
        limit, 
        total: totalDocs,
        offset: pagingCounter, 
        offsets: totalPages
    }
} 

module.exports = {serialize, paginateSerialize}
