const request = require('supertest');
const app = require('../../../src/app');
const { PeopleDataFaker } = require('../../support/dataFaker');

let BearerToken = null;
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

    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar2);

    result = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`);
  });

  it('Should get all cars', (done) => {
    const { body } = result;
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
    done();
  });

  it('Should return a body Array veiculos with values type String Number and Array  ', (done) => {
    const { body } = result;
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
    done();
  });

  it('Should return status code 200', (done) => {
    const { status } = result;

    expect(status).toBe(200);
    done();
  });
});

describe('Should get all cars by their names', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Fiat Pulse',
      cor: 'Branca',
      ano: 2022,
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Elétrica' }],
      quantidadePassageiros: 5
    };

    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);

    result = await request(app).get(`/api/v1/car/?nome=${fakerCar.nome}`).set('Authorization', `Bearer ${BearerToken}`);
  });

  it('Should return a body with the same properties from the parameter ', (done) => {
    const { body } = result;
    const { veiculos } = body;

    expect(veiculos[0]).toHaveProperty('_id');
    expect(veiculos[0].modelo).toBe(fakerCar.modelo);
    expect(veiculos[0].cor).toBe(fakerCar.cor);
    expect(veiculos[0].ano).toBe(fakerCar.ano);
    expect(veiculos[0].acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    expect(veiculos[0].acessorios[1].descricao).toBe(fakerCar.acessorios[1].descricao);
    done();
  });

  it('Should return a body Array veiculos with values type String Number and Array  ', (done) => {
    const { body } = result;
    const { veiculos } = body;

    expect(veiculos[0]).toEqual({
      _id: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      ano: expect.any(Number),
      acessorios: expect.any(Array),
      quantidadePassageiros: expect.any(Number)
    });
    done();
  });

  it('Should return status code 200', (done) => {
    const { status } = result;

    expect(status).toBe(200);
    done();
  });
});
