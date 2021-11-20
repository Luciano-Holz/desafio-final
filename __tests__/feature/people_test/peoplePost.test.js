const request = require('supertest');
const app = require('../../../src/app');

let fakerPeople = {};
let fakerPeople2 = {};
describe('API :: POST :: /people', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
  });

  it('Should return a body with _id and the same properties from fakerPeople except senha', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body).toHaveProperty('_id');
    expect(body.nome).toBe(fakerPeople.nome);
    expect(body.cpf).toBe(fakerPeople.cpf);
    expect(body.data_nascimento).toBe(fakerPeople.data_nascimento);
    expect(body.email).toBe(fakerPeople.email);
    expect(body.habilitado).toBe(fakerPeople.habilitado);
  });

  it('Should return a body with values type string', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);
    expect(body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cpf: expect.any(String),
      data_nascimento: expect.any(String),
      email: expect.any(String),
      habilitado: expect.any(String)
    });
  });

  it('Should return status 201', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);
    expect(status).toBe(201);
  });
});

describe('Should do not create a person with nome space empty', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: ' ',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
  });

  it('Should return status 400 with errors if nome has spaces empty', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0].name).toBe('nome');
    expect(body[0].description).toBe('"nome" is not allowed to be empty');
  });

  it('Should return a body with values type string', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(status).toBe(400);
  });
});

describe('Should do not create a person with cpf invalid', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840',
      data_nascimento: '04/01/1995',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
  });

  it('Should return status 400 with errors if cpf is invalid', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0].name).toBe('cpf');
    expect(body[0].description).toBe(
      '"cpf" with value "521.111.840" fails to match the required pattern: /^\\d{3}\\.\\d{3}\\.\\d{3}-\\d{2}$/'
    );
  });

  it('Should return a body with values type string', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(status).toBe(400);
  });
});

describe('Should do not create a person with a cpf already in using', () => {
  beforeEach(() => {
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
  });

  it('Should return status 400 with errors if cpf is already in use', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople2);

    expect(body.name).toBe('Conflict');
    expect(body.description).toBe(`Cpf ${fakerPeople2.cpf} is already in use`);
  });

  it('Should return a body with values type string', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople2);

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople2);

    expect(status).toBe(400);
  });
});

describe('Should do not create a person with data_nascimento invalid', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/19',
      senha: '1234567',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
  });

  it('Should return status 400 with errors if data_nascimento invalid', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0].name).toBe('data_nascimento');
    expect(body[0].description).toBe('"data_nascimento" must be in DD/MM/YYYY format');
  });

  it('Should return a body with values type string', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(status).toBe(400);
  });
});

describe('Should do not create a person with senha less than 6 characteres', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123',
      email: 'fulano@example.com',
      habilitado: 'sim'
    };
  });

  it('Should return status 400 with errors if senha do not had min 6 characters', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0].name).toBe('senha');
    expect(body[0].description).toBe('"senha" length must be at least 6 characters long');
  });

  it('Should return a body with values type string', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(status).toBe(400);
  });
});

describe('Should do not create a person with email invalid', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123456',
      email: 'fulano',
      habilitado: 'sim'
    };
  });

  it('Should return status 400 with errors if email is invalid', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0].name).toBe('email');
    expect(body[0].description).toBe('"email" must be a valid email');
  });

  it('Should return a body with values type string', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(status).toBe(400);
  });
});

describe('Do not create a person with an email already in use', () => {
  beforeEach(() => {
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
  });

  it('Should return status 400 with errors if email is already using', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople2);

    expect(body.name).toBe('Conflict');
    expect(body.description).toBe(`Email ${fakerPeople2.email} is already in use`);
  });

  it('Should return a body with values type string', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople2);

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    await request(app).post('/api/v1/people/').send(fakerPeople);

    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople2);

    expect(status).toBe(400);
  });
});

describe('Should do not create a person with habilitado different as sim or nao', () => {
  beforeEach(() => {
    fakerPeople = {
      nome: 'Fulano de Tal',
      cpf: '521.111.840-55',
      data_nascimento: '04/01/1995',
      senha: '123456',
      email: 'fulano@example.com',
      habilitado: 's'
    };
  });

  it('Should return status 400 with errors if habilitado do not is [sim, nao]', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0].name).toBe('habilitado');
    expect(body[0].description).toBe('"habilitado" must be one of [sim, nao]');
  });

  it('Should return a body with values type string', async () => {
    const { body } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(body[0]).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
  });

  it('Should return status code 400', async () => {
    const { status } = await request(app).post('/api/v1/people/').send(fakerPeople);

    expect(status).toBe(400);
  });
});
