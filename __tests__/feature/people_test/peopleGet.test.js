const request = require('supertest');
const app = require('../../../src/app');
const { PeopleDataFaker } = require('../../support/dataFaker');

let fakerPeople = {};
let fakerPeople2 = {};
let result = {};
describe('API :: GET :: /people', () => {
  beforeEach(async () => {
    fakerPeople = PeopleDataFaker();
    fakerPeople2 = PeopleDataFaker();
    await request(app).post('/api/v1/people/').send(fakerPeople);
    await request(app).post('/api/v1/people/').send(fakerPeople2);
    result = await request(app).get('/api/v1/people/');
  });

  it('Should get all people', (done) => {
    const { body } = result;
    const { people } = body;

    expect(people[0]).toHaveProperty('_id');
    expect(people[0].nome).toBe(fakerPeople.nome);
    expect(people[0].cpf).toBe(fakerPeople.cpf);
    expect(people[0].data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(people[0].email).toBe(fakerPeople.email);
    expect(people[0].habilitado).toBe(fakerPeople.habilitado);

    expect(people[1]).toHaveProperty('_id');
    expect(people[1].nome).toBe(fakerPeople2.nome);
    expect(people[1].cpf).toBe(fakerPeople2.cpf);
    expect(people[1].data_nascimento).toBe(fakerPeople2.data_nascimento);
    expect(people[1].email).toBe(fakerPeople2.email);
    expect(people[1].habilitado).toBe(fakerPeople2.habilitado);
    done();
  });

  it('Should return a body Array people with values type string', (done) => {
    const { body } = result;
    const { people } = body;

    expect(people[0]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });

    expect(people[1]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
    done();
  });

  it('Should return status 200', (done) => {
    const { status } = result;
    expect(status).toBe(200);
    done();
  });
});

describe('Should get all people by their names', () => {
  beforeEach(async () => {
    fakerPeople = PeopleDataFaker();
    await request(app).post('/api/v1/people/').send(fakerPeople);
    result = await request(app).get(`/api/v1/people/?nome=${fakerPeople.nome}`);
  });

  it('Should return a body with the same properties from the parameter', (done) => {
    const { body } = result;
    const { people } = body;

    expect(people).toHaveLength(1);
    expect(people[0].nome).toBe(fakerPeople.nome);
    expect(people[0].cpf).toBe(fakerPeople.cpf);
    expect(people[0].data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(people[0].email).toBe(fakerPeople.email);
    expect(people[0].habilitado).toBe(fakerPeople.habilitado);
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;
    const { people } = body;

    expect(people[0]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
    done();
  });

  it('Should return status code 200', (done) => {
    const response = result;

    const { status } = response;
    expect(status).toBe(200);
    done();
  });
});
