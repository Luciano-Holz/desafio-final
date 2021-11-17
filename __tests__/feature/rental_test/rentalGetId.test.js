// const request = require('supertest');

// const app = require('../../../src/app');

// describe('API :: GET{id} :: /rental', () => {
//   it('Should get rental by Id', async () => {
//     const fakerRental = {
//       nome: 'Localiza',
//       cnpj: '78.863.735/0001-36',
//       atividades: 'Aluga Veiculos',
//       endereco: [
//         {
//           cep: '459.424.800-44',
//           number: 123,
//           isFilial: false
//         }
//       ]
//     };
//     const { text } = await request(app).post('/api/v1/rental').send(fakerRental);

//     const { _id } = JSON.parse(text);
//     const { body } = await request(app).get(`/api/v1/rental/${_id.toString()}`);
//     expect(body).toEqual({
//       _id: expect.any(String),
//       cnpj: expect.any(String),
//       atividades: expect.any(String),
//       endereco: expect.any(Array)
//     });
//     const { status } = await request(app).get('/api/v1/rental/');
//     expect(status).toBe(200);
//   });
// });
