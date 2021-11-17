const request = require('supertest');
const app = require('../../../src/app');

describe('API :: GET{id} :: /people', () => {
  it('Should get a people by Id', async () => {
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
    const response = await request(app).get(`/api/v1/people/${_id.toString()}`);

    const { body } = response;
    expect(body.nome).toBe(fakerPeople.nome);
    expect(body.cpf).toBe(fakerPeople.cpf);
    expect(body.data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(body.email).toBe(fakerPeople.email);
    expect(body.habilitado).toBe(fakerPeople.habilitado);
    const { status } = response;
    expect(status).toBe(200);
  });
});
