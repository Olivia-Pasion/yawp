const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');



describe('restaurant routes', () => {
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
    const agent = request.agent(app);

    await agent.post('/api/v1/users/sessions').send({
      email: '123@abc',
      password: '123abc'
    });

    const res = await agent
      .post('/api/v1/restaurants/1/reviews')
      .send({
        stars: 5,
        detail: 'It was okay'
      });

    expect(res.body).toEqual({
      id: expect.any(String),
      stars: expect.any(Number),
      detail: expect.any(String)
    });
  });
  it('#DELETE /api/v1/reviews/:id original post user and/or admin can delete post', async () => {
    const agent = request.agent(app);

    await agent.post('/api/v1/users/sessions').send({
      email: '123@abc',
      password: '123abc'
    });

    await agent
      .post('/api/v1/restaurants/1/reviews')
      .send({
        stars: 5,
        detail: 'It was okay'
      });

    const resp = await agent.delete('/api/v1/reviews/2');
    expect(resp.status).toBe(200);

    const reviewResp = await agent.get('/api/v1/reviews/2');
    expect(reviewResp.status).toBe(404);
  });
  afterAll(() => {
    pool.end();
  });
});


