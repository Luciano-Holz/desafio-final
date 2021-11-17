// const request = require('supertest');

// const app = require('../../../src/app');

// describe('API :: POST :: /rental', () => {
//   let result;
//   let fakerRental;
//   const Prefix = '/api/v1/rental/';
//   beforeEach(async () => {
//     fakerRental = {
//       nome: 'Localiza',
//       cnpj: '70.159.778/0001-23',
//       atividades: 'Aluga Veiculos',
//       endereco: [
//         {
//           cep: '96170-000',
//           number: '123',
//           isFilial: false
//         }
//       ]
//     };
//     result = await request(app).post(Prefix).send(fakerRental);
//   });
//   it('Should return Created status 201', () => {
//     expect(result.status).toBe(201);
//     expect(result.body.nome).toBe(fakerRental.nome);
//     expect(result.body.cnpj).toBe(fakerRental.cnpj);
//     expect(result.body.atividades).toBe(fakerRental.atividades);
//     expect(result.body.endereco[0].cep).toBe(fakerRental.endereco[0].cep);
//     expect(result.body.endereco[0].isFilial).toBe(fakerRental.endereco[0].isFilial);
//   });
// });
