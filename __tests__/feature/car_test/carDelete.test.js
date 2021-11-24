const request = require('supertest');
const app = require('../../../src/app');
const { PeopleDataFaker } = require('../../support/dataFaker');
const { CarDataFaker } = require('../../support/dataFaker');

let BearerToken = null;
let fakerId = {};
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
describe('API :: DELETE :: /car', () => {
  beforeEach(async () => {
    fakerCar = CarDataFaker();

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app).delete(`/api/v1/car/${_id.toString()}`).set('Authorization', `Bearer ${BearerToken}`);
  });
  it('Should delete a people by Id', (done) => {
    const { body } = result;

    expect(body.modelo).toBeUndefined();
    expect(body.cor).toBeUndefined();
    expect(body.ano).toBeUndefined();
    expect(body.acessorios).toBeUndefined();
    expect(body.quantidadePassageiros).toBeUndefined();
    done();
  });

  it('Should return status code 204', (done) => {
    const { status } = result;

    expect(status).toBe(204);
    done();
  });
});

describe('Should return an error id not found', () => {
  beforeEach(async () => {
    fakerId = '6195522596696e997f8b6806';

    result = await request(app).delete(`/api/v1/car/${fakerId}`).set('Authorization', `Bearer ${BearerToken}`);
  });

  it('Should return an object with name and description properties', (done) => {
    const { body } = result;

    expect(body.name).toBe('id');
    expect(body.description).toBe(`Id ${fakerId} not found`);
    done();
  });

  it('should return a object with properties type string', (done) => {
    const { body } = result;

    expect(body).toEqual({
      name: expect.any(String),
      description: expect.any(String)
    });
    done();
  });

  it('Should return status code 404', (done) => {
    const { status } = result;

    expect(status).toBe(404);
    done();
  });
});

describe('Should return an error id invalid', () => {
  beforeEach(async () => {
    fakerId = '6195522596696e997f8b680';

    result = await request(app).delete(`/api/v1/car/${fakerId}`).set('Authorization', `Bearer ${BearerToken}`);
  });

  it('Should return an object with name and description properties', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('_id');
    expect(body[0].description).toBe(
      `"_id" with value "${fakerId}" fails to match the required pattern: /^[0-9a-fA-F]{24}$/`
    );
    done();
  });

  it('should return a object with properties type string', (done) => {
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
