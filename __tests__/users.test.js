const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#POST /api/v1/users should create new user', async () => {
    const res = await request(app).post('/api/v1/users').send({ userName: 'test_1', email: 'abc@123', password: 'abc123' });
    expect(res.status).toEqual(200);
  });
  it('#POST /pi/v1/users/sessions should login an existing user', async () => {
    await request(app).post('/api/v1/users').send({ userName: 'test_2', email: '123@abc', password: '123abc' });
    const res = await request(app).post('/api/v1/users/sessions').send({ userName: 'test_2', email: '123@abc', password: '123abc' });
    console.log('BODY', res.body);
    expect(res.status).toBe(200);
  });
  afterAll(async () => {
    await setup(pool);
    pool.end();
  });
});
