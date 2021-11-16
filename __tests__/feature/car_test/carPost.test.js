const request = require('supertest');
const app = require('../../../src/app');

let BearerToken = null;
beforeAll(async () => {
  const fakerPeople = {
    nome: 'Fulano de Tal',
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

describe('API :: POST :: /car', () => {
  it('Should return Created status 201', async () => {
    const fakerCar = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };
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
});
