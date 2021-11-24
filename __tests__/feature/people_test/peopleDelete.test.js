const request = require('supertest');
const app = require('../../../src/app');
const { PeopleDataFaker } = require('../../support/dataFaker');

let fakerPeople = {};
let fakerId = '';
let result = {};
describe('API :: DELETE :: /people', () => {
  beforeEach(async () => {
    fakerPeople = PeopleDataFaker();

    const { text } = await request(app).post('/api/v1/people/').send(fakerPeople);
    const { _id } = JSON.parse(text);
    result = await request(app).delete(`/api/v1/people/${_id.toString()}`);
  });
  it('Should return an empty body', (done) => {
    const { body } = result;

    expect(body.nome).toBeUndefined();
    expect(body.cpf).toBeUndefined();
    expect(body.data_nascimento).toBeUndefined();
    expect(body.email).toBeUndefined();
    expect(body.habilitado).toBeUndefined();
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
    fakerId = '6198fdf429f71a82ab732aa2';

    result = await request(app).delete(`/api/v1/people/${fakerId}`);
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
    fakerId = '6198fdf429f71a82ab732a';

    result = await request(app).delete(`/api/v1/people/${fakerId}`);
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
