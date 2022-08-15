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
    console.log(res.body);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      userName: expect.any(String),
      email: expect.any(String),
    });
  });
  afterAll(async () => {
    await setup(pool);
    pool.end();
  });
});
