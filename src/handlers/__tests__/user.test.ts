import * as user from '../auth';

describe('user handler', () => {
  it('Should create a new user', async () => {
    const req = { body: { username: 'hello', password: 'strongpassword'}}
    const res = { json({token}) {
      expect(token).toBeTruthy();
    }}
    await user.signup(req, res, () => {})
  })
})