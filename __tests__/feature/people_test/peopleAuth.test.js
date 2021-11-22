const request = require('supertest');
const app = require('../../../src/app');

let fakerPeople = {};
beforeEach(async () => {
  fakerPeople = {
    nome: 'Fulano de Tal',
    cpf: '521.111.840-55',
    data_nascimento: '04/01/1995',
    senha: '1234567',
    email: 'fulano@example.com',
    habilitado: 'sim'
  };

  await request(app).post('/api/v1/people/').send(fakerPeople);
});

describe('API :: AUTHENTICATE :: /authenticate', () => {
  it('Should return a body with token property', async () => {
    const credentialsFakerPeople = {
      email: 'fulano@example.com',
      senha: '1234567'
    };

    const { body } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);

    expect(body).toHaveProperty('token');
    expect(body.email).toBe(fakerPeople.email);
    expect(body.habilitado).toBe(fakerPeople.habilitado);
  });

  it('Should return a body with token string', async () => {
    const credentialsFakerPeople = {
      email: 'fulano@example.com',
      senha: '1234567'
    };

    const { body } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);

    expect(body).toEqual({
      email: expect.any(String),
      habilitado: expect.any(String),
      token: expect.any(String)
    });
  });

  it('should return status 200', async () => {
    const credentialsFakerPeople = {
      email: 'fulano@example.com',
      senha: '1234567'
    };

    const { status } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);
    expect(status).toBe(200);
  });
});

describe('API :: AUTHENTICATE :: /people', () => {
  it('Should return a body with error invalid email', async () => {
    const credentialsFakerPeople = {
      email: 'ciclano@example.com',
      senha: '1234567'
    };

    const { body } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);

    expect(body.name).toBe('email');
    expect(body.description).toBe('Email do not exists in database');
  });

  it('Should return a body with error email invalid', async () => {
    const credentialsFakerPeople = {
      email: 'ciclano@example.com',
      senha: '1234567'
    };

    const { body } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('should return status 404', async () => {
    const credentialsFakerPeople = {
      email: 'ciclano@example.com',
      senha: '1234567'
    };

    const { status } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);
    expect(status).toBe(404);
  });
});

describe('API :: AUTHENTICATE :: /people', () => {
  it('Should return a body with error incorrect senha', async () => {
    const credentialsFakerPeople = {
      email: 'fulano@example.com',
      senha: '123senha'
    };

    const { body } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);

    expect(body.name).toBe('senha');
    expect(body.description).toBe('Senha is incorrect.');
  });

  it('Should return a body with string errors', async () => {
    const credentialsFakerPeople = {
      email: 'fulano@example.com',
      senha: '123senha'
    };

    const { body } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('should return status 400', async () => {
    const credentialsFakerPeople = {
      email: 'fulano@example.com',
      senha: '123senha'
    };

    const { status } = await request(app).post('/api/v1/authenticate/').send(credentialsFakerPeople);
    expect(status).toBe(400);
  });
});
