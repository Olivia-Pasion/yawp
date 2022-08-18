const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');

const testUser = [{
  userName: 'test',
  email: 'abc@123',
  password: 'abc123',
}, {
  userName: 'test2',
  email: '123@abc',
  password: '123abc',
}];

const registerAndLogin = async (userProps = {}) => {
  const password = userProps.password ?? testUser[0].password;

  const agent = request.agent(app);
  const [, user] = await UserService.signUp({ ...testUser[0], ...userProps });

  const { email } = user;
  await agent.post('/api/v1/users/sessions').send({ email, password });
  console.log({ user });
  return [agent, user];
};

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
  it('#DELETE /api/v1/reviews/:id original post user or admin can delete post', async () => {
    const [agent] = await registerAndLogin();
    const resp = await agent.delete('/api/v1/reviews/2');
    expect(resp.status).toBe(204);
  });
  afterAll(() => {
    pool.end();
  });
});


