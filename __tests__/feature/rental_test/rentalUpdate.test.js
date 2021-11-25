const request = require('supertest');
const app = require('../../../src/app');

let fakerRental = {};
let payload = {};
let result = {};
describe('API :: UPDATE :: /rental', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza',
      cnpj: '70.159.778/0001-23',
      atividades: 'Aluga Veiculos',
      endereco: [
        {
          cep: '96060-184',
          number: 123,
          isFilial: false
        }
      ]
    };

    payload = {
      nome: 'Rent a Car',
      cnpj: '70.159.778/0001-23',
      atividades: 'Locadora',
      endereco: [
        {
          cep: '96060-184',
          number: 123,
          isFilial: true
        }
      ]
    };

    const { text } = await request(app).post('/api/v1/rental/').send(fakerRental);
    const { _id } = JSON.parse(text);

    result = await request(app).put(`/api/v1/rental/${_id.toString()}`).send(payload);
  });

  it('Should update rental nome, atividades and isFilial', (done) => {
    const { body } = result;

    expect(body).toHaveProperty('_id');
    expect(body.nome).toBe(payload.nome);
    expect(body.cnpj).toBe(fakerRental.cnpj);
    expect(body.atividades).toBe(payload.atividades);
    expect(body.endereco[0].cep).toBe(fakerRental.endereco[0].cep);
    expect(body.endereco[0].number).toBe(fakerRental.endereco[0].number);
    expect(body.endereco[0].isFilial).toBe(payload.endereco[0].isFilial);
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

  it('should return status 200', (done) => {
    const { status } = result;

    expect(status).toBe(200);
    done();
  });
});

describe('Should do not create a rental with nome field empty', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Rent',
      cnpj: '70.159.778/0001-23',
      atividades: 'Aluga Veiculos',
      endereco: [
        {
          cep: '96077-686',
          number: 123,
          isFilial: false
        }
      ]
    };

    payload = {
      nome: ' ',
      cnpj: '70.159.778/0001-23',
      atividades: 'Locadora',
      endereco: [
        {
          cep: '96060-184',
          number: 123,
          isFilial: true
        }
      ]
    };
    const { text } = await request(app).post('/api/v1/rental/').send(fakerRental);
    const { _id } = JSON.parse(text);

    result = await request(app).put(`/api/v1/rental/${_id.toString()}`).send(payload);
  });

  it('Should return name and description from error', (done) => {
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
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});

describe('Should do not update a rental with cnpj is invalid', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza Car',
      cnpj: '24.421.133/0001-08',
      atividades: 'Aluga Veiculos',
      endereco: [
        {
          cep: '96077-686',
          number: 123,
          isFilial: false
        }
      ]
    };

    payload = {
      nome: 'Localiza Car',
      cnpj: '24.421.133/0001',
      atividades: 'Locadora',
      endereco: [
        {
          cep: '96060-184',
          number: 123,
          isFilial: true
        }
      ]
    };
    const { text } = await request(app).post('/api/v1/rental/').send(fakerRental);
    const { _id } = JSON.parse(text);

    result = await request(app).put(`/api/v1/rental/${_id.toString()}`).send(payload);
  });

  it('Should return name and description from error ', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('cnpj');
    expect(body[0].description).toBe(
      `"cnpj" with value "${payload.cnpj}" fails to match the required pattern: /^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}$/`
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

  it('Should return status 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});
