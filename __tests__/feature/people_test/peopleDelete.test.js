const request = require('supertest');
const app = require('../../../src/app');

let fakerPeople = {};
describe('API :: DELETE :: /people', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123456',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
  });
  it('Should return an empty body', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(fakerPeople);
    const { _id } = JSON.parse(text);
    const response = await request(app).delete(`/api/v1/people/${_id.toString()}`);
    const { body } = response;

    expect(body.nome).toBeUndefined();
    expect(body.cpf).toBeUndefined();
    expect(body.data_nascimento).toBeUndefined();
    expect(body.email).toBeUndefined();
    expect(body.habilitado).toBeUndefined();
  });

  it('Should return status code 204', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(fakerPeople);
    const { _id } = JSON.parse(text);

    const { status } = await request(app).delete(`/api/v1/people/${_id.toString()}`);
    expect(status).toBe(204);
  });
});
