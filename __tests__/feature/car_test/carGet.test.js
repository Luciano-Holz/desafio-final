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

// describe('API :: GET :: /car', () => {
//   it('Should get all car', async () => {
//     const fakerCar = {
//       modelo: 'Ford Focus',
//       cor: 'Prata',
//       ano: 2013,
//       acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Hidraulica' }],
//       quantidadePassageiros: 5
//     };
//     await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);

//     const response = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`);
//     const { body } = response;
//     const { veiculos } = body;
//     expect(veiculos[0].modelo).toBe(fakerCar.modelo);
//     expect(veiculos[0].cor).toBe(fakerCar.cor);
//     expect(veiculos[0].ano).toBe(fakerCar.ano);
//     expect(veiculos[0].acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
//     expect(veiculos[0].acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
//     const { status } = response;
//     expect(status).toBe(200);
//   });
// });
