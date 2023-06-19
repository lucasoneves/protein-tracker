import app from '../server';

import supertest from 'supertest';

describe('GET /', () => {
  it('should send back some data', async () => {
    const rest = await supertest(app)
    .get('/')

    expect(rest.body.message).toBe('hello');
  })
})