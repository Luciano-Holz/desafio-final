const request = require('supertest');
const app = require('../../../src/app');

let fakerRental = {};
let result = {};
describe('API :: POST :: /rental', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza',
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
    result = await request(app).post('/api/v1/rental/').send(fakerRental);
  });

  it('Should return a body with _id and the same properties from fakerRental with full address', (done) => {
    const { body } = result;

    expect(body).toHaveProperty('_id');
    expect(body.nome).toBe(fakerRental.nome);
    expect(body.cnpj).toBe(fakerRental.cnpj);
    expect(body.atividades).toBe(fakerRental.atividades);
    expect(body.endereco[0].cep).toBe(fakerRental.endereco[0].cep);
    expect(body.endereco[0].logradouro).toBeDefined();
    expect(body.endereco[0].complemento).toBeDefined();
    expect(body.endereco[0].bairro).toBeDefined();
    expect(body.endereco[0].number).toBe(fakerRental.endereco[0].number);
    expect(body.endereco[0].localidade).toBeDefined();
    expect(body.endereco[0].uf).toBeDefined();
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

  it('should return status code 201', async () => {
    const { status } = result;

    expect(status).toBe(201);
  });
});

describe('Should do not create a rental with nome field empty', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: ' ',
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
    result = await request(app).post('/api/v1/rental/').send(fakerRental);
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

describe('Should do not create a rental with cnpj is invalid', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza Car',
      cnpj: '70.159.778/0001',
      atividades: 'Aluga Veiculos',
      endereco: [
        {
          cep: '96077-686',
          number: 123,
          isFilial: false
        }
      ]
    };
    result = await request(app).post('/api/v1/rental/').send(fakerRental);
  });

  it('Should return name and description from error ', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('cnpj');
    expect(body[0].description).toBe(
      `"cnpj" with value "${fakerRental.cnpj}" fails to match the required pattern: /^\\d{2}\\.\\d{3}\\.\\d{3}\\/\\d{4}-\\d{2}$/`
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

describe('Should do not create a rental if atividades field is empty', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza Car',
      cnpj: '88.366.107/0001-07',
      atividades: ' ',
      endereco: [
        {
          cep: '96077-686',
          number: 123,
          isFilial: false
        }
      ]
    };
    result = await request(app).post('/api/v1/rental/').send(fakerRental);
  });

  it('Should return name and description from error ', (done) => {
    const { body } = result;

    expect(body[0].name).toBe('atividades');
    expect(body[0].description).toBe(`"atividades" is not allowed to be empty`);
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

describe('Should do not create a rental if isFilial has two falses', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza Car',
      cnpj: '88.366.107/0001-07',
      atividades: 'Aluguel de Carros',
      endereco: [
        {
          cep: '96077-686',
          number: 123,
          isFilial: false
        },
        {
          cep: '96077-686',
          number: 1234,
          isFilial: false
        }
      ]
    };
    result = await request(app).post('/api/v1/rental/').send(fakerRental);
  });

  it('Should return name and description from error ', (done) => {
    const { body } = result;

    expect(body.name).toBe('Conflict');
    expect(body.description).toBe(`IsFilial false is possible only in one address`);
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

  it('Should return status 400', (done) => {
    const { status } = result;

    expect(status).toBe(400);
    done();
  });
});
