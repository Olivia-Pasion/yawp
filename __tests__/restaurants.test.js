const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /restaurants shows a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    console.log(res.body.length);
    console.log(res.body[0]);
    expect(res.body.length).toEqual(3);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });
  it('#GET /restaurants/:restId shows restaurant detail', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    console.log(res.body);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      cuisine: expect.any(String),
      reviews: expect.any(Array)
    });
  });
  afterAll(() => {
    pool.end();
  });
});


