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
  
  afterAll(async () => {
    await setup(pool);
    pool.end();
  });
});
