const request = require('supertest');
const app = require('../../../src/app');
const { PeopleDataFaker } = require('../../support/dataFaker');

let fakerPeople = {};
let fakerPeople2 = {};
let result = {};
describe('API :: POST :: /people', () => {
  beforeEach(async () => {
    fakerPeople = PeopleDataFaker();
    result = await request(app).post('/api/v1/people/').send(fakerPeople);
  });

  it('Should return a body with _id and the same properties from fakerPeople except senha', (done) => {
    const { body } = result;

    expect(body).toHaveProperty('_id');
    expect(body.nome).toBe(fakerPeople.nome);
    expect(body.cpf).toBe(fakerPeople.cpf);
    expect(body.data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(body.email).toBe(fakerPeople.email);
    expect(body.habilitado).toBe(fakerPeople.habilitado);
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;
    expect(body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
    done();
  });

  it('Should return status 201', (done) => {
    expect(result.status).toBe(201);
    done();
  });
});

describe('Should do not create a person with nome space empty', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: ' ',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post('/api/v1/people/').send(fakerPeople);
  });

  it('Should return status 400 with errors if nome has spaces empty', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('nome');
    expect(body[0].description).toBe('"nome" is not allowed to be empty');
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status 400', (done) => {
    expect(result.status).toBe(400);
    done();
  });
});

describe('Should do not create a person with cpf invalid', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post('/api/v1/people/').send(fakerPeople);
  });

  it('Should return status 400 with errors if cpf is invalid', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('cpf');
    expect(body[0].description).toBe(
      '"cpf" with value "521.111.840" fails to match the required pattern: /^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/'
    );
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});

describe('Should do not create a person with a cpf already in using', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1998',
      senha: '123456',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };

    fakerPeople2 = {
      nome: 'Ciclano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1994',
      senha: '1234567',
      email: 'ciclano@example.com',
      habilitado: 'nao'
    };
    await request(app).post('/api/v1/people/').send(fakerPeople);
    result = await request(app).post('/api/v1/people/').send(fakerPeople2);
  });

  it('Should return status 400 with errors if cpf is already in use', (done) => {
    const { body } = result;

    expect(body.name).toBe('Conflict');
    expect(body.description).toBe(`Cpf ${fakerPeople2.cpf} is already in use`);
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});

describe('Should do not create a person with data_nascimento invalid', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/19',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post('/api/v1/people/').send(fakerPeople);
  });

  it('Should return status 400 with errors if data_nascimento invalid', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('data_nascimento');
    expect(body[0].description).toBe('"data_nascimento" must be in DD/MM/YYYY format');
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});

describe('Should do not create a person with senha less than 6 characteres', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
    result = await request(app).post('/api/v1/people/').send(fakerPeople);
  });

  it('Should return status 400 with errors if senha do not had min 6 characters', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('senha');
    expect(body[0].description).toBe('"senha" length must be at least 6 characters long');
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});

describe('Should do not create a person with email invalid', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123456',
      email: 'fulano',
      habilitado: 'sim'
    };
    result = await request(app).post('/api/v1/people/').send(fakerPeople);
  });

  it('Should return status 400 with errors if email is invalid', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('email');
    expect(body[0].description).toBe('"email" must be a valid email');
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});

describe('Do not create a person with an email already in use', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };

    fakerPeople2 = {
      nome: 'Ciclano de Tal',
      cpf: '157.840.560-26',
      data_nascimento: '04/01/1996',
      senha: '123456',
      email: 'fulano@example.com',
      habilitado: 'nao'
    };

    await request(app).post('/api/v1/people/').send(fakerPeople);
    result = await request(app).post('/api/v1/people/').send(fakerPeople2);
  });

  it('Should return status 400 with errors if email is already using', (done) => {
    const { body } = result;

    expect(body.name).toBe('Conflict');
    expect(body.description).toBe(`Email ${fakerPeople2.email} is already in use`);
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});

describe('Should do not create a person with habilitado different as sim or nao', () => {
  beforeEach(async () => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123456',
      email: 'fulano@example.com',
      habilitado: 's'
    };
    result = await request(app).post('/api/v1/people/').send(fakerPeople);
  });

  it('Should return status 400 with errors if habilitado do not is [sim, nao]', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('habilitado');
    expect(body[0].description).toBe('"habilitado" must be one of [sim, nao]');
    done();
  });

  it('Should return a body with values type string', (done) => {
    const { body } = result;

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});
