const request = require('supertest');
const app = require('../../../src/app');

let BearerToken = null;

beforeAll(async () => {
  const fakerPeople = {
    nome: 'Beltrano de Tal',
    cpf: '255.655.954-36',
    data_nascimento: '08/07/1999',
    senha: 'senha123',
    email: 'beltrano@example.com',
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

describe('API :: POST :: /car', () => {
  beforeEach(async () => {
    fakerCar = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };
  });

  it('Sould return a body with _id and same properties from fakerCar except senha', async () => {
    const { body } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar)
      .send(fakerCar);

    expect(body).toHaveProperty('_id');
    expect(body.modelo).toBe(fakerCar.modelo);
    expect(body.cor).toBe(fakerCar.cor);
    expect(body.ano).toBe(fakerCar.ano);
    expect(body.acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    expect(body.quantidadePassageiros).toBe(fakerCar.quantidadePassageiros);
  });

  it('Should return a body with values type String, Number and Array', async () => {
    const { body } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);

    expect(body).toEqual({
      _id: expect.any(String),
      modelo: expect.any(String),
      cor: expect.any(String),
      ano: expect.any(Number),
      acessorios: expect.any(Array),
      quantidadePassageiros: expect.any(Number)
    });
    const { status } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    expect(status).toBe(201);
  });

  it('Should return status code 201', async () => {
    const { status } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakerCar);
    expect(status).toBe(201);
  });
});
