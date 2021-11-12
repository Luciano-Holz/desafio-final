const request = require('supertest');

const app = require('../../src/app');
const carSchema = require('../../src/app/schema/CarSchema');

describe('API :: POST :: /car', () => {
  afterAll(async () => {
    await carSchema.deleteMany();
  });
  beforeAll(async () => {
    await carSchema.deleteMany();
  });
  beforeEach(async () => {
    await carSchema.deleteMany();
  });
  describe('', () => {
    let result;
    let fakeCar;
    const Prefix = '/api/v1/car/';
    beforeEach(async () => {
      fakeCar = {
        modelo: 'Ford Focus',
        cor: 'Prata',
        ano: 2013,
        acessorios: [{ descricao: 'Ar-condicionado' }],
        quantidadePassageiros: 5
      };
      result = await request(app).post(Prefix).send(fakeCar);
    });
    it('Should return Created status 201', () => {
      expect(result.status).toBe(201);
      expect(result.body.modelo).toBe('Ford Focus');
      expect(result.body.cor).toBe('Prata');
      expect(result.body.ano).toBe(2013);
      expect(result.body.acessorios.length).toEqual(1);
      expect(result.body.quantidadePassageiros).toBe(5);
    });
  });
});
