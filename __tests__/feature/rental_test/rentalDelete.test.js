const request = require('supertest');
const app = require('../../../src/app');

let fakerRental = {};
let fakerId = '';
let result = {};
describe('API :: GET{id} :: /rental', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza',
      cnpj: '88.366.107/0001-07',
      atividades: 'Aluga Veiculos',
      endereco: [
        {
          cep: '91110-120',
          number: 123,
          isFilial: false
        }
      ]
    };

    const { text } = await request(app).post('/api/v1/rental').send(fakerRental);
    const { _id } = JSON.parse(text);

    result = await request(app).delete(`/api/v1/rental/${_id.toString()}`);
  });

  it('Should return an empty body ', (done) => {
    const { body } = result;

    expect(body.nome).toBeUndefined();
    expect(body.cnpj).toBeUndefined();
    expect(body.atividades).toBeUndefined();
    expect(body.endereco).toBeUndefined();
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
    fakerId = '6198fdf429f71a82ab732bc5';

    result = await request(app).delete(`/api/v1/rental/${fakerId}`);
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
    fakerId = '6198fdf429f71a82ab732bc';

    result = await request(app).delete(`/api/v1/rental/${fakerId}`);
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
