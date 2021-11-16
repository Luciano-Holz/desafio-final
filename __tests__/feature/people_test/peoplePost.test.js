const request = require('supertest');
const app = require('../../../src/app');

describe('API :: POST :: /people', () => {
  it('Should return Created status 201', async () => {
    const fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);
    expect(body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);
    expect(status).toBe(201);
  });
});
