const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('#GET /restaurants shows a list of restaurants', async () => {
    const res = await request(app).get('/api/v1/restaurants');
    expect(res.body.length).toEqual(3);
    expect(res.body[0]).toEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });
  it('#GET /restaurants/:restId shows restaurant detail', async () => {
    const res = await request(app).get('/api/v1/restaurants/1');
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      cuisine: expect.any(String),
      reviews: expect.any(Array)
    });
  });
  it('#POST /restaurants/:restId/reviews authenticated user can create a new review', async () => {
    const [, user] = await UserService.signUp({ userName: 'test3', email: 'abc@abc', password: 'abcabc' });
    const res = await request(app).post('/api/v1/restaurants').send({
      review: [{
        
      }];
    })
  });
  afterAll(() => {
    pool.end();
  });
});


