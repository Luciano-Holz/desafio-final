const request = require('supertest');
const app = require('../../src/app');
const CarSchema = require('../../src/app/schema/CarSchema');
const PeopleSchema = require('../../src/app/schema/PeopleSchema');

let BearerToken = null;
beforeAll(async () => {
  await CarSchema.deleteMany();
  await PeopleSchema.deleteMany();

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

describe('API :: POST :: /car', () => {
  it('Should return Created status 201', async () => {
    const fakerCar = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }],
      quantidadePassageiros: 5
    };
    const result = await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);
    expect(result.body.modelo).toBe('Ford Focus');
    expect(result.body.cor).toBe('Prata');
    expect(result.body.ano).toBe(2013);
    expect(result.body.acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    expect(result.body.quantidadePassageiros).toBe(fakerCar.quantidadePassageiros);
    expect(result.status).toBe(201);
  });
});

describe('API :: GET :: /car', () => {
  it('Should get all car', async () => {
    const fakerCar = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Hidraulica' }],
      quantidadePassageiros: 5
    };
    await request(app).post('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`).send(fakerCar);

    const response = await request(app).get('/api/v1/car/').set('Authorization', `Bearer ${BearerToken}`);
    const { body } = response;
    const { veiculos } = body;
    expect(veiculos[0].modelo).toBe(fakerCar.modelo);
    expect(veiculos[0].cor).toBe(fakerCar.cor);
    expect(veiculos[0].ano).toBe(fakerCar.ano);
    expect(veiculos[0].acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    expect(veiculos[0].acessorios[0].descricao).toBe(fakerCar.acessorios[0].descricao);
    const { status } = response;
    expect(status).toBe(200);
  });
});
describe('API :: GET{id} :: /car', () => {
  it('Should get car by Id', async () => {
    const fakeCar = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Hidraulica' }],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakeCar);

    const { _id } = JSON.parse(text);

    const response = await request(app)
      .get(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`);
    const { body } = response;
    expect(body.modelo).toBe(fakeCar.modelo);
    expect(body.cor).toBe(fakeCar.cor);
    expect(body.ano).toBe(fakeCar.ano);
    expect(body.acessorios[0].descricao).toBe(fakeCar.acessorios[0].descricao);
    expect(body.acessorios[1].descricao).toBe(fakeCar.acessorios[1].descricao);
    expect(body.quantidadePassageiros).toBe(fakeCar.quantidadePassageiros);
    const { status } = response;
    expect(status).toBe(200);
  });
});
describe('API :: DELETE :: /car', () => {
  it('Should delete a people by Id', async () => {
    const fakeCar = {
      modelo: 'Ford Focus',
      cor: 'Prata',
      ano: 2013,
      acessorios: [{ descricao: 'Ar-condicionado' }, { descricao: 'Direção Hidraulica' }],
      quantidadePassageiros: 5
    };

    const { text } = await request(app)
      .post('/api/v1/car/')
      .set('Authorization', `Bearer ${BearerToken}`)
      .send(fakeCar);

    const { _id } = JSON.parse(text);

    const response = await request(app)
      .delete(`/api/v1/car/${_id.toString()}`)
      .set('Authorization', `Bearer ${BearerToken}`);
    const { body } = response;
    expect(body.modelo).toBeUndefined();
    expect(body.cor).toBeUndefined();
    expect(body.ano).toBeUndefined();
    expect(body.acessorios).toBeUndefined();
    expect(body.quantidadePassageiros).toBeUndefined();
    const { status } = response;
    expect(status).toBe(204);
  });
});
