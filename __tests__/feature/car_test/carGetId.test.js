// const request = require('supertest');
// const app = require('../../../src/app');

// let BearerToken = null;
// beforeAll(async () => {
//   const fakerPeople = {
//     nome: 'Luciano Holz',
//     cpf: '035.891.820-08',
//     data_nascimento: '07/06/2001',
//     email: 'luciano@example.com',
//     senha: '123456',
//     habilitado: 'sim'
//   };
//   await request(app).post('/api/v1/people/').send(fakerPeople);

//   const result = await request(app)
//     .post('/api/v1/authenticate/')
//     .send({ email: fakerPeople.email, senha: fakerPeople.senha });

//   const { body } = result;
//   BearerToken = body.token;
// });

// describe('API :: GET{id} :: /car', () => {
//   it('Should get car by Id', async () => {
//     const fakeCar = {
//       modelo: 'Ford Focus',
//       cor: 'Prata',
//       ano: 2013,
//       acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Hidraulica' }],
//       quantidadePassageiros: 5
//     };

//     const { text } = await request(app)
//       .post('/api/v1/car/')
//       .set('Authorization', `Bearer ${BearerToken}`)
//       .send(fakeCar);

//     const { _id } = JSON.parse(text);

//     const response = await request(app)
//       .get(`/api/v1/car/${_id.toString()}`)
//       .set('Authorization', `Bearer ${BearerToken}`);
//     const { body } = response;
//     expect(body.modelo).toBe(fakeCar.modelo);
//     expect(body.cor).toBe(fakeCar.cor);
//     expect(body.ano).toBe(fakeCar.ano);
//     expect(body.acessorios[0].descricao).toBe(fakeCar.acessorios[0].descricao);
//     expect(body.acessorios[1].descricao).toBe(fakeCar.acessorios[1].descricao);
//     expect(body.quantidadePassageiros).toBe(fakeCar.quantidadePassageiros);
//     const { status } = response;
//     expect(status).toBe(200);
//   });
// });
