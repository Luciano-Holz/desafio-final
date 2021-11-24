const request = require('supertest');
const app = require('../../../src/app');
const { PeopleDataFaker } = require('../../support/dataFaker');
const { CarDataFaker } = require('../../support/dataFaker');

let BearerToken = null;
let result = {};
beforeAll(async () => {
  const fakerPeople = PeopleDataFaker();
  await request(app).post('/api/v1/people/').send(fakerPeople);

  result = await request(app)
    .post('/api/v1/authenticate/')
    .send({ email: fakerPeople.email, senha: fakerPeople.senha });

  const { body } = result;
  BearerToken = body.token;
});

let fakerCar = {};

describe('API :: POST :: /car', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
  });

  it('Sould return a body with _id and same properties from fakerCar except senha', (done) => {
    const { body } = result;

    expect(body).toHaveProperty('_id');
    expect(body.modelo).toBe(fakerCar.modelo);
    expect(body.cor).toBe(fakerCar.cor);
    expect(body.ano).toBe(fakerCar.ano);
    expect(body.acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    expect(body.quantidadePassageiros).toBe(fakerCar.quantidadePassageiros);
    done();
  });

  it('Should return a body with values type String, Number and Array', (done) => {
    const { body } = result;

    expect(body).toEqual({
      _id: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      ano: expect.any(Number),
      acessorios: expect.any(Array),
      quantidadePassageiros: expect.any(Number)
    });
    done();
  });

  it('Should return status code 201', (done) => {
    const { status } = result;

    expect(status).toBe(201);
    done();
  });
});

describe('Should do not create a car with modelo field empty', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: ' ',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };
    result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
  });

  it('Sould return a body with errors if field modelo is empty', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('modelo');
    expect(body[0].description).toBe('"modelo" is not allowed to be empty');
    done();
  });

  it('Should return a body with values type String', (done) => {
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

describe('Should do not create a car with cor field empty', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Fiat Pulse',
      cor: ' ',
      ano: 2022,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };
    result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
  });

  it('Sould return a body with errors if field cor is empty', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('cor');
    expect(body[0].description).toBe('"cor" is not allowed to be empty');
    done();
  });

  it('Should return a body with values type String', (done) => {
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

describe('Should do not create a car with year invalid', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Fiat Pulse',
      cor: 'Branca',
      ano: 2023,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };
    result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
  });

  it('Sould return a body with errors if ano do not is between 1950 - 2022', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('ano');
    expect(body[0].description).toBe('"ano" must be less than or equal to 2022');
    done();
  });

  it('Should return a body with values type String', (done) => {
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

describe('Should do not create a car with acessorios field is empty', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Fiat Pulse',
      cor: 'Branca',
      ano: 2021,
      acessorios: [],
      quantidadePassageiros: 5
    };
    result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
  });

  it('Sould return a body with errors if acessorios does not contain least 1 item', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('acessorios');
    expect(body[0].description).toBe('"acessorios" must contain at least 1 items');
    done();
  });

  it('Should return a body with values type String', (done) => {
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

describe('Should do not create a car with acessorios field is empty', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Fiat Pulse',
      cor: 'Branca',
      ano: 2021,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: ' '
    };
    result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
  });

  it('Sould return a body with errors if quantidadePassageiros is not a number', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('quantidadePassageiros');
    expect(body[0].description).toBe('"quantidadePassageiros" must be a number');
    done();
  });

  it('Should return a body with values type String', (done) => {
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
