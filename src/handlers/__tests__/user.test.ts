import * as user from '../auth';
import supertest from 'supertest';

describe('Sign In user', () => {
  it('Should create a new user', async () => {
    const req = { body: { username: 'hello', password: 'strongpassword'}}
    const res = { json({token}) {
      expect(token).toBeTruthy();
    }}
    await user.signin(req, res, () => {})
  })
})