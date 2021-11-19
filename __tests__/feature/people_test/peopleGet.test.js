// const request = require('supertest');
// const app = require('../../../src/app');

// describe('API :: GET :: /people', () => {
//   it('Should get all people', async () => {
//     const fakerPeople = {
//       nome: 'Fulano de Tal',
//       cpf: '521.111.840-55',
//       data_nascimento: '04/01/1995',
//       senha: '123456',
//       email: 'fulano@example.com',
//       habilitado: 'sim'
//     };
//     await request(app).post('/api/v1/people/').send(fakerPeople);

//     const response = await request(app).get('/api/v1/people/');

//     const { body } = response;
//     const { people } = body;
//     expect(people[0].nome).toBe(fakerPeople.nome);
//     expect(people[0].cpf).toBe(fakerPeople.cpf);
//     expect(people[0].data_nascimento).toBe(fakerPeople.data_nascimento);
//     expect(people[0].email).toBe(fakerPeople.email);
//     expect(people[0].habilitado).toBe(fakerPeople.habilitado);
//     const { status } = response;
//     expect(status).toBe(200);
//   });
// });
