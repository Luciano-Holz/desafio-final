const request = require('supertest');
const app = require('../../../src/app');
const { PeopleDataFaker } = require('../../support/dataFaker');

let BearerToken = null;
let fakerCar = {};
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

describe('API :: GET{id} :: /car', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Hidraulica' }],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    const { _id } = JSON.parse(text);

    result = await request(app).get(`/api/v1/car/${_id.toString()}`).set('Authorization', `Bearer ${BearerToken}`);
  });

  it('Should return a body with _id and the same properties from fakerCar', (done) => {
    const { body } = result;

    expect(body.modelo).toBe(fakerCar.modelo);
    expect(body.cor).toBe(fakerCar.cor);
    expect(body.ano).toBe(fakerCar.ano);
    expect(body.acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    expect(body.acessorios[1].descricao).toBe(fakerCar.acessorios[1].descricao);
    expect(body.quantidadePassageiros).toBe(fakerCar.quantidadePassageiros);
    done();
  });

  it('Should return a body Array veiculos with values type String Number and Array  ', (done) => {
    const { body } = result;

    expect(body).toEqual({
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

describe('Should do not get a car by _id', () => {
  beforeEach(async () => {
    const _id = '61718ad8c7cc0336a69900a6';

    result = await request(app).get(`/api/v1/car/${_id}`).set('Authorization', `Bearer ${BearerToken}`);
  });

  it('Should return error if _id is invalid', (done) => {
    const { body } = result;

    expect(body.name).toBe('id');
    expect(body.description).toBe('Id 61718ad8c7cc0336a69900a6 is invalid');
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
