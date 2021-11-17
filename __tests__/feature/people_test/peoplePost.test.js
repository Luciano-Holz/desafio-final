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
    expect(status).toBe(400);
  });
});

describe('', () => {
  let result;
  const Prefix = '/api/v1/people/';
  beforeEach(async () => {
    const fakerPeople = {
      nome: ' ',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post(Prefix).send(fakerPeople);
  });
  it('Should return status 400 with errors if nome has spaces empty', () => {
    expect(result.status).toBe(400);
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(result.body[0].name).toBe('nome');
    expect(result.body[0].description).toBe('"nome" is not allowed to be empty');
  });
});
describe('', () => {
  let result;
  const Prefix = '/api/v1/people/';
  beforeEach(async () => {
    const fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post(Prefix).send(fakerPeople);
  });
  it('Should return status 400 with errors if cpf is invalid', () => {
    expect(result.status).toBe(400);
    expect(result.body.length).toEqual(1);
    expect(result.body[0].name).toBe('cpf');
    expect(result.body[0].description).toBe(
      '"cpf" with value "521.111.840" fails to match the required pattern: /^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/'
    );
  });
});
describe('', () => {
  let result;
  const Prefix = '/api/v1/people/';
  beforeEach(async () => {
    const fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/19',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post(Prefix).send(fakerPeople);
  });
  it('Should return status 400 with errors if data_nascimento is invalid', () => {
    expect(result.status).toBe(400);
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(result.body[0].name).toBe('data_nascimento');
    expect(result.body[0].description).toBe('"data_nascimento" must be in DD/MM/YYYY format');
  });
});
describe('', () => {
  let result;
  const Prefix = '/api/v1/people/';
  beforeEach(async () => {
    const fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post(Prefix).send(fakerPeople);
  });
  it('Should return status 400 with errors if senha do not had min 6 characters', () => {
    expect(result.status).toBe(400);
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(result.body[0].name).toBe('senha');
    expect(result.body[0].description).toBe('"senha" length must be at least 6 characters long');
  });
});
describe('', () => {
  let result;
  const Prefix = '/api/v1/people/';
  beforeEach(async () => {
    const fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123',
      email: 'fulano',
      habilitado: 'sim'
    };
    result = await request(app).post(Prefix).send(fakerPeople);
  });
  it('Should return status 400 with errors if email is invalid', () => {
    expect(result.status).toBe(400);
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(result.body[0].name).toBe('email');
    expect(result.body[0].description).toBe('"email" must be a valid email');
  });
});
describe('', () => {
  let result;
  const Prefix = '/api/v1/people/';
  beforeEach(async () => {
    const fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123456',
      email: 'fulano@example.com',
      habilitado: 's'
    };
    result = await request(app).post(Prefix).send(fakerPeople);
  });
  it('Should return status 400 with errors if habilitado do not is [sim, nao]', () => {
    expect(result.status).toBe(400);
    expect(result.body.length).toBeGreaterThanOrEqual(1);
    expect(result.body[0].name).toBe('habilitado');
    expect(result.body[0].description).toBe('"habilitado" must be one of [sim, nao]');
  });
});
