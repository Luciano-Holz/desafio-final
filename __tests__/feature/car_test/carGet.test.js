const request = require('supertest');
const app = require('../../../src/app');

let BearerToken = null;

beforeAll(async () => {
  const fakerPeople = {
    nome: 'Luciano Holz',
    cpf: '035.891.820-08',
    data_nascimento: '07/06/2001',
    email: 'luciano@example.com',
    senha: '123456',
    habilitado: 'sim'
  };
  await request(app).post('/api/v1/people/').send(fakerPeople);

  const result = await request(app)
    .post('/api/v1/authenticate/')
    .send({ email: fakerPeople.email, senha: fakerPeople.senha });

  const { body } = result;
  BearerToken = body.token;
});

let fakerCar = {};
let fakerCar2 = {};

describe('API :: GET :: /car', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Fiat Pulse',
      cor: 'Branca',
      ano: 2022,
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Elétrica' }],
      quantidadePassageiros: 5
    };

    fakerCar2 = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Hidraulica' }],
      quantidadePassageiros: 5
    };
  });

  it('Should get all cars', async () => {
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar2);

    const response = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`);
    const { body } = response;
    const { veiculos } = body;

    expect(veiculos[0]).toHaveProperty('_id');
    expect(veiculos[0].modelo).toBe(fakerCar.modelo);
    expect(veiculos[0].cor).toBe(fakerCar.cor);
    expect(veiculos[0].ano).toBe(fakerCar.ano);
    expect(veiculos[0].acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    expect(veiculos[0].acessorios[1].descricao).toBe(fakerCar.acessorios[1].descricao);

    expect(veiculos[1]).toHaveProperty('_id');
    expect(veiculos[1].modelo).toBe(fakerCar2.modelo);
    expect(veiculos[1].cor).toBe(fakerCar2.cor);
    expect(veiculos[1].ano).toBe(fakerCar2.ano);
    expect(veiculos[1].acessorios[0].descricao).toBe(fakerCar2.acessorios[0].descricao);
    expect(veiculos[1].acessorios[1].descricao).toBe(fakerCar2.acessorios[1].descricao);
  });

  it('Should return a body Array veiculos with values type String Number and Array  ', async () => {
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar2);

    const { body } = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`);

    const { veiculos } = body;

    expect(veiculos[0]).toEqual({
      _id: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      ano: expect.any(Number),
      acessorios: expect.any(Array),
      quantidadePassageiros: expect.any(Number)
    });

    expect(veiculos[1]).toEqual({
      _id: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      ano: expect.any(Number),
      acessorios: expect.any(Array),
      quantidadePassageiros: expect.any(Number)
    });
  });

  it('Should return status code 200', async () => {
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar2);

    const { status } = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`);

    expect(status).toBe(200);
  });
});
