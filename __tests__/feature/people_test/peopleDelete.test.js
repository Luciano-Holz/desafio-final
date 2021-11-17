const request = require('supertest');
const app = require('../../../src/app');

describe('API :: DELETE :: /people', () => {
  it('Should delete a people by Id', async () => {
    const fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123456',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };

    const { text } = await request(app).post('/api/v1/people/').send(fakerPeople);
    const { _id } = JSON.parse(text);
    const response = await request(app).delete(`/api/v1/people/${_id.toString()}`);
    const { body } = response;

    expect(body.nome).toBeUndefined();
    expect(body.cpf).toBeUndefined();
    expect(body.data_nascimento).toBeUndefined();
    expect(body.email).toBeUndefined();
    expect(body.habilitado).toBeUndefined();
    const { status } = response;
    expect(status).toBe(204);
  });
});
