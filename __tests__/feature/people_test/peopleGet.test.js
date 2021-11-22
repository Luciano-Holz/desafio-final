const request = require('supertest');
const app = require('../../../src/app');

let fakerPeople = {};
describe('API :: GET :: /people', () => {
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

  it('Should return a body with _id and the same properties from fakerPeople except senha', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).get('/api/v1/people/');
    const { people } = body;

    expect(people).toHaveLength(1);
    expect(people[0].nome).toBe(fakerPeople.nome);
    expect(people[0].cpf).toBe(fakerPeople.cpf);
    expect(people[0].data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(people[0].email).toBe(fakerPeople.email);
    expect(people[0].habilitado).toBe(fakerPeople.habilitado);
  });

  it('Should return a body Array people with values type string', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).get('/api/v1/people/');
    const { people } = body;

    expect(people[0]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
  });

  it('Should return status 200', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { status } = await request(app).get('/api/v1/people/').send(fakerPeople);
    expect(status).toBe(200);
  });
});

describe('Should get all people by theyr names', () => {
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

  it('Should return a body with _id and the same properties from fakerPeople except senha', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).get(`/api/v1/people/?nome=${fakerPeople.nome}`);
    const { people } = body;

    expect(people).toHaveLength(1);
    expect(people[0].nome).toBe(fakerPeople.nome);
    expect(people[0].cpf).toBe(fakerPeople.cpf);
    expect(people[0].data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(people[0].email).toBe(fakerPeople.email);
    expect(people[0].habilitado).toBe(fakerPeople.habilitado);
  });

  it('Should return a body with values type string', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).get(`/api/v1/people/?nome=${fakerPeople.nome}`);
    const { people } = body;

    expect(people[0]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
  });

  it('Should return status code 200', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const response = await request(app).get(`/api/v1/people/?nome=${fakerPeople.nome}`);

    const { status } = response;
    expect(status).toBe(200);
  });
});
