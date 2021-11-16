const request = require('supertest');

const app = require('../../src/app');

describe('API :: POST :: /rental', () => {
  describe('', () => {
    let result;
    let fakerRental;
    const Prefix = '/api/v1/rental/';
    beforeEach(async () => {
      fakerRental = {
        nome: 'Localiza',
        cnpj: '70.159.778/0001-23',
        atividades: 'Aluga Veiculos',
        endereco: [
          {
            cep: '96170-000',
            number: '123',
            isFilial: false
          }
        ]
      };
      result = await request(app).post(Prefix).send(fakerRental);
    });
    it('Should return Created status 201', () => {
      expect(result.status).toBe(201);
      expect(result.body.nome).toBe(fakerRental.nome);
      expect(result.body.cnpj).toBe(fakerRental.cnpj);
      expect(result.body.atividades).toBe(fakerRental.atividades);
      expect(result.body.endereco[0].cep).toBe(fakerRental.endereco[0].cep);
      expect(result.body.endereco[0].isFilial).toBe(fakerRental.endereco[0].isFilial);
    });
  });
  describe('', () => {
    let result;
    const Prefix = '/api/v1/rental/';
    beforeEach(async () => {
      const fakerRental = {
        nome: ' ',
        cnpj: '78.863.735/0001-36',
        atividades: 'Aluga Veiculos',
        endereco: [
          {
            cep: '459.424.800-44',
            number: 123,
            isFilial: false
          }
        ]
      };
      result = await request(app).post(Prefix).send(fakerRental);
    });
    it('Should return status 400 with errors if nome has spaces empty', () => {
      expect(result.status).toBe(400);
      expect(result.body.length).toBeGreaterThanOrEqual(1);
      expect(result.body[0].name).toBe('nome');
      expect(result.body[0].description).toBe('"nome" is not allowed to be empty');
    });
  });
  describe('', () => {
    let result;
    const Prefix = '/api/v1/rental/';
    beforeEach(async () => {
      const fakerRental = {
        nome: 'Localiza',
        cnpj: '78.863.735/0001-36',
        atividades: ' ',
        endereco: [
          {
            cep: '459.424.800-44',
            number: 123,
            isFilial: false
          }
        ]
      };
      result = await request(app).post(Prefix).send(fakerRental);
    });
    it('Should return status 400 with errors if atividades has spaces empty', () => {
      expect(result.status).toBe(400);
      expect(result.body.length).toBeGreaterThanOrEqual(1);
      expect(result.body[0].name).toBe('atividades');
      expect(result.body[0].description).toBe('"atividades" is not allowed to be empty');
    });
  });
  describe('', () => {
    let result;
    const Prefix = '/api/v1/rental/';
    beforeEach(async () => {
      const fakerRental = {
        nome: 'Localiza',
        cnpj: '78.863.735/0001-36',
        atividades: ' ',
        endereco: [
          {
            cep: '459.424.800-44',
            number: 123,
            isFilial: false
          }
        ]
      };
      result = await request(app).post(Prefix).send(fakerRental);
    });
    it('Should return status 400 with errors if atividades has spaces empty', () => {
      expect(result.status).toBe(400);
      expect(result.body.length).toBeGreaterThanOrEqual(1);
      expect(result.body[0].name).toBe('atividades');
      expect(result.body[0].description).toBe('"atividades" is not allowed to be empty');
    });
  });
  describe('', () => {
    let result;
    const Prefix = '/api/v1/rental/';
    beforeEach(async () => {
      const fakerRental = {
        nome: 'Localiza',
        cnpj: '78.863.735/0001-36',
        atividades: 'Aluga Veiculos',
        endereco: []
      };
      result = await request(app).post(Prefix).send(fakerRental);
    });
    it('Should return status 400 with errors if atividades has spaces empty', () => {
      expect(result.status).toBe(400);
      expect(result.body.length).toBeGreaterThanOrEqual(1);
      expect(result.body[0].name).toBe('endereco');
      expect(result.body[0].description).toBe('"endereco" must contain at least 1 items');
    });
  });
});
