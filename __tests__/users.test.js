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
  return [agent, user];
};


describe('users routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('#POST /api/v1/users should create new user and login', async () => {
    const [agent] = await registerAndLogin();
    const res = await agent.post('/api/v1/users').send(testUser[0]);
    expect(res.status).toEqual(200);
  });


  it('/protected should return a 401 if not authenticated', async () => {
    const res = await request(app).get('/api/v1/users/protected');
    expect(res.status).toEqual(401);
  });

  it('/protected should return the current user if authenticated', async () => {
    const [agent] = await registerAndLogin({ email: 'admin' });
    const res = await agent.get('/api/v1/users/protected');
    expect(res.status).toEqual(200);
  });

  it('#POST /api/v1/users/sessions should login an existing user', async () => {
    await request(app).post('/api/v1/users').send(testUser[1]);
    const res = await request(app).post('/api/v1/users/sessions').send({ email: '123@abc', password: '123abc' });
    expect(res.status).toBe(200);
  });
  it('#GET /api/v1/users should show admins a list of users', async () => {
    const [agent] = await registerAndLogin({
      email: 'admin',
      password: 'adminboss'
    });
  
    const res = await agent.get('/api/v1/users');
    expect(res.body.length).toEqual(2);
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
