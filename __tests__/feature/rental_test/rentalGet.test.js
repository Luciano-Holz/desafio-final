const request = require('supertest');

const app = require('../../../src/app');

let fakerRental = {};
let fakerRental2 = {};
let result = {};
describe('API :: GET :: /rental', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza',
      cnpj: '78.863.735/0001-36',
      atividades: 'Aluga Veiculos',
      endereco: [
        {
          cep: '96087-215',
          number: 123,
          isFilial: false
        }
      ]
    };
    fakerRental2 = {
      nome: 'Localiza Rents',
      cnpj: '88.366.107/0001-07',
      atividades: 'Aluguel',
      endereco: [
        {
          cep: '96071-500',
          number: 123,
          isFilial: false
        }
      ]
    };
    await request(app).post('/api/v1/rental').send(fakerRental);
    await request(app).post('/api/v1/rental').send(fakerRental2);

    result = await request(app).get('/api/v1/rental/');
  });

  it('Sould get an Array locadoras with all rentals', (done) => {
    const { body } = result;
    const { locadoras } = body;

    expect(locadoras).toHaveLength(2);
    expect(locadoras[0].nome).toBe(fakerRental.nome);
    expect(locadoras[0].cnpj).toBe(fakerRental.cnpj);
    expect(locadoras[0].atividades).toBe(fakerRental.atividades);
    expect(locadoras[0].endereco[0].cep).toBe(fakerRental.endereco[0].cep);
    expect(locadoras[0].endereco[0].logradouro).toBeDefined();
    expect(locadoras[0].endereco[0].complemento).toBeDefined();
    expect(locadoras[0].endereco[0].bairro).toBeDefined();
    expect(locadoras[0].endereco[0].number).toBe(fakerRental.endereco[0].number);
    expect(locadoras[0].endereco[0].localidade).toBeDefined();
    expect(locadoras[0].endereco[0].uf).toBeDefined();
    expect(locadoras[0].endereco[0].isFilial).toBe(fakerRental.endereco[0].isFilial);
    done();
  });

  it('Should return a body with values type string, object and number ', (done) => {
    const { body } = result;
    const { locadoras } = body;

    expect(locadoras[0]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cnpj: expect.any(String),
      atividades: expect.any(String),
      endereco: expect.any(Object)
    });
    expect(locadoras[0].endereco[0]).toEqual({
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

    expect(locadoras[1]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cnpj: expect.any(String),
      atividades: expect.any(String),
      endereco: expect.any(Object)
    });
    expect(locadoras[1].endereco[0]).toEqual({
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

  it('should return status code 200', async () => {
    const { status } = result;

    expect(status).toBe(200);
  });
});

describe('Should get all rentals by their names', () => {
  beforeEach(async () => {
    fakerRental = {
      nome: 'Localiza',
      cnpj: '78.863.735/0001-36',
      atividades: 'Aluga Veiculos',
      endereco: [
        {
          cep: '96087-215',
          number: 123,
          isFilial: false
        }
      ]
    };

    await request(app).post('/api/v1/rental').send(fakerRental);

    result = await request(app).get(`/api/v1/rental/?nome=${fakerRental.nome}`);
  });

  it('Sould get an Array locadoras with all rentals', (done) => {
    const { body } = result;
    const { locadoras } = body;

    expect(locadoras).toHaveLength(1);
    expect(locadoras[0]).toHaveProperty('_id');
    expect(locadoras[0].nome).toBe(fakerRental.nome);
    expect(locadoras[0].cnpj).toBe(fakerRental.cnpj);
    expect(locadoras[0].atividades).toBe(fakerRental.atividades);
    expect(locadoras[0].endereco[0].cep).toBe(fakerRental.endereco[0].cep);
    expect(locadoras[0].endereco[0].logradouro).toBeDefined();
    expect(locadoras[0].endereco[0].complemento).toBeDefined();
    expect(locadoras[0].endereco[0].bairro).toBeDefined();
    expect(locadoras[0].endereco[0].number).toBe(fakerRental.endereco[0].number);
    expect(locadoras[0].endereco[0].localidade).toBeDefined();
    expect(locadoras[0].endereco[0].uf).toBeDefined();
    expect(locadoras[0].endereco[0].isFilial).toBe(fakerRental.endereco[0].isFilial);
    done();
  });

  it('Should return a body with values type string, object and number ', (done) => {
    const { body } = result;
    const { locadoras } = body;

    expect(locadoras[0]).toEqual({
      _id: expect.any(String),
      nome: expect.any(String),
      cnpj: expect.any(String),
      atividades: expect.any(String),
      endereco: expect.any(Object)
    });
    expect(locadoras[0].endereco[0]).toEqual({
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

  it('should return status code 200', async () => {
    const { status } = result;

    expect(status).toBe(200);
  });
});
