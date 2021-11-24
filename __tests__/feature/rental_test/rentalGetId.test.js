const request = require('supertest');
const app = require('../../../src/app');

let fakerRental = {};
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

    result = await request(app).get(`/api/v1/rental/${_id.toString()}`);
  });

  it('Should return a body with _id and the same properties from fakerRental', (done) => {
    const { body } = result;

    expect(body).toHaveProperty('_id');
    expect(body.nome).toBe(fakerRental.nome);
    expect(body.cnpj).toBe(fakerRental.cnpj);
    expect(body.atividades).toBe(fakerRental.atividades);
    expect(body.endereco[0].cep).toBe(fakerRental.endereco[0].cep);
    expect(body.endereco[0].number).toBe(fakerRental.endereco[0].number);
    expect(body.endereco[0].isFilial).toBe(fakerRental.endereco[0].isFilial);
    done();
  });

  it('Should return a body with values type string, object and number ', (done) => {
    const { body } = result;

    expect(body).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cnpj: expect.any(String),
      atividades: expect.any(String),
      endereco: expect.any(Object)
    });
    expect(body.endereco[0]).toEqual({
      _id: expect.any(String),
      cep: expect.any(String),
      logradouro: expect.any(String),
      complemento: expect.any(String),
      bairro: expect.any(String),
      number: expect.any(Number),
      localidade: expect.any(String),
      uf: expect.any(String),
      isFilial: expect.any(Boolean)
    });
    done();
  });

  it('Should return status code 200', (done) => {
    const { status } = result;

    expect(status).toBe(200);
    done();
  });
});

describe('Should do not get a rental by _id', () => {
  beforeEach(async () => {
    const _id = '61718ad8c7cc0336a69911a5';

    result = await request(app).get(`/api/v1/rental/${_id}`);
  });

  it('Should return name and description from error', (done) => {
    const { body } = result;

    expect(body.name).toBe('id');
    expect(body.description).toBe(`Id 61718ad8c7cc0336a69911a5 is invalid`);
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
