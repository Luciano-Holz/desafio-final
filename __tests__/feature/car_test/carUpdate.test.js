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
let payload = {};
describe('API :: UPDATE :: /car', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    payload = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app)
      .put(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(payload);
  });

  it('Sould return a body with _id and and changes except senha', (done) => {
    const { body } = result;

    expect(body).toHaveProperty('_id');
    expect(body.modelo).toBe(payload.modelo);
    expect(body.cor).toBe(payload.cor);
    expect(body.ano).toBe(payload.ano);
    expect(body.acessorios[0].descricao).toBe(payload.acessorios[0].descricao);
    expect(body.quantidadePassageiros).toBe(payload.quantidadePassageiros);
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

  it('Should return status code 200', (done) => {
    const { status } = result;

    expect(status).toBe(200);
    done();
  });
});

describe('Should do not update a car with nome field empty', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    payload = {
      modelo: ' ',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app)
      .put(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(payload);
  });

  it('Sould return a body with _id and and changes except senha', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('modelo');
    expect(body[0].description).toBe('"modelo" is not allowed to be empty');
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

describe('Should do not update a car with cor field empty', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    payload = {
      modelo: 'Ford Focus',
      cor: ' ',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app)
      .put(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(payload);
  });

  it('Sould return an error if cor field is empt', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('cor');
    expect(body[0].description).toBe('"cor" is not allowed to be empty');
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

describe('Should do not update a car with year invalid', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    payload = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2025,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app)
      .put(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(payload);
  });

  it('Sould return an error if ano is invalid', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('ano');
    expect(body[0].description).toBe('"ano" must be less than or equal to 2022');
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

describe('Should do not update a car if acessorios field is empty', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    payload = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2021,
      acessorios: [],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app)
      .put(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(payload);
  });

  it('Sould return an error if acessorios field is empty', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('acessorios');
    expect(body[0].description).toBe('"acessorios" must contain at least 1 items');
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

describe('Should do not update a car if quantidadePassageiros field is not a number', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    payload = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2021,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: ' '
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app)
      .put(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(payload);
  });

  it('Sould return a body with errors if quantidadePassageiros is not a number', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('quantidadePassageiros');
    expect(body[0].description).toBe('"quantidadePassageiros" must be a number');
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
