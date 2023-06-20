import * as password from '../password';

describe('Reset password', () => {
  it('Should send link to email typed if there is a email', async () => {
    const req = { body: { email: 'shanoonlane@gmail.com'}}
    const res = {
      json({data}) {
        data.message = 'Password link sended to email address'
        data.link.toBeTruthy()
      }
    }
    await password.forgotPasswordHandler(req, res)
  })
})