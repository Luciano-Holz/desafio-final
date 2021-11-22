const request = require('supertest');
const app = require('../../../src/app');

let fakerPeople = {};

describe('API :: GET{id} :: /people', () => {
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

  it('Should return a body with _id and the same properties from fakerPeople expect senha', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(fakerPeople);
    const { _id } = JSON.parse(text);

    const { body } = await request(app).get(`/api/v1/people/${_id.toString()}`);

    expect(body.nome).toBe(fakerPeople.nome);
    expect(body.cpf).toBe(fakerPeople.cpf);
    expect(body.data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(body.email).toBe(fakerPeople.email);
    expect(body.habilitado).toBe(fakerPeople.habilitado);
  });

  it('Should return a object with values type string', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(fakerPeople);
    const { _id } = JSON.parse(text);

    const { body } = await request(app).get(`/api/v1/people/${_id.toString()}`);

    expect(body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
  });

  it('Should return status code 200', async () => {
    const { text } = await request(app).post('/api/v1/people/').send(fakerPeople);
    const { _id } = JSON.parse(text);

    const { status } = await request(app).get(`/api/v1/people/${_id.toString()}`);
    expect(status).toBe(200);
  });
});

describe('Should do not get a person by _id', () => {
  it('Should return status 400 with errors if _id is invalid', async () => {
    const _id = '61718ad8c7cc0116a68800a6';
    const { body } = await request(app).get(`/api/v1/people/${_id}`);

    expect(body.name).toBe('id');
    expect(body.description).toBe('Id 61718ad8c7cc0116a68800a6 is invalid');
  });

  it('Should return a body with values type string', async () => {
    const id = '61718ad8c7cc0116a68800a6';

    const { body } = await request(app).get(`/api/v1/people/${id}`);

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    const id = '61718ad8c7cc0116a68800a6';

    const { status } = await request(app).get(`/api/v1/people/${id}`);
    expect(status).toBe(400);
  });
});
