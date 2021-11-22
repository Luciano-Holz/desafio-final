const request = require('supertest');
const app = require('../../../src/app');

let fakerPeople = {};
let fakerId = '';
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

describe('Should return an error id not found', () => {
  beforeEach(() => {
    fakerId = '6198fdf429f71a82ab732aa2';
  });

  it('Should return an object with name and description properties', async () => {
    const { body } = await request(app).delete(`/api/v1/people/${fakerId}`);

    expect(body.name).toBe('id');
    expect(body.description).toBe(`Id ${fakerId} not found`);
  });

  it('should return a object with properties type string', async () => {
    const { body } = await request(app).delete(`/api/v1/people/${fakerId}`);

    expect(body).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should return status code 404', async () => {
    const { status } = await request(app).delete(`/api/v1/people/${fakerId}`);

    expect(status).toBe(404);
  });
});

describe('Should return an error id invalid', () => {
  beforeEach(() => {
    fakerId = '6198fdf429f71a82ab732a';
  });

  it('Should return an object with name and description properties', async () => {
    const { body } = await request(app).delete(`/api/v1/people/${fakerId}`);

    expect(body[0].name).toBe('_id');
    expect(body[0].description).toBe(
      `"_id" with value "${fakerId}" fails to match the required pattern: /^[0-9a-fA-F]{24}$/`
    );
  });

  it('should return a object with properties type string', async () => {
    const { body } = await request(app).delete(`/api/v1/people/${fakerId}`);

    expect(body[0]).toEqual({
      description: expect.any(String),
      name: expect.any(String)
    });
  });

  it('Should return status code 404', async () => {
    const { status } = await request(app).delete(`/api/v1/people/${fakerId}`);

    expect(status).toBe(400);
  });
});
