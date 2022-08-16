const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('users routes', () => {
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
    expect(res.status).toBe(200);
  });
  it('#GET /api/v1/users should show list of users for admins', async () => {
    const adminUser = {
      email: 'admin@admin',
      password: 'adminboss'
    };
    
    const agent = request.agent(app);

    const res = await request(app).get('/api/v1/users');
    console.log(res.body);
    //expect(res.body.length).toEqual(2);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      userName: expect.any(String)
    });
  });
  afterAll(async () => {
    await setup(pool);
    pool.end();
  });
});
