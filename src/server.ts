import express from 'express';
import router from './router';
import { protect } from './modules/auth';
import { signup, signin } from './handlers/auth';
import { body } from 'express-validator';
import { forgotPasswordHandler, resetPasswordHandler, sendNewPassword } from './handlers/password';
import { handleInputErrors } from './modules/middleware';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', protect, router);

// Users routes
app.post('/signup', body('username').isString(), body('email').isString(), body('password').isString(), handleInputErrors, signup);
app.post('/signin', body('email').exists().isString(), body('password').exists().isString(), signin)

app.post('/forgot-password', body('email').exists().isString(), forgotPasswordHandler);
// app.get('/forgot-password', (req, res) => {});

app.get('/reset-password/:id/:token', resetPasswordHandler, (req, res, next) => {

});
app.post('/reset-password/:id/:token', body('password').notEmpty(), handleInputErrors, sendNewPassword)

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({ data: { message: "Not authorized" }})
  }

  else if (err.type === 'input') {
    res.status(400).json({ data: { message: "Invalid input"}})
  }

  else if (err.type === 'signup') {
    res.status(401).json({ data: { message: 'It was not possible to create user' }})
  }

  else if (err.type === 'user_not_found') {
    res.status(404).json({ data: { message: 'E-mail not found' }})
  }

  else if (err.type === 'password') {
    res.status(404).json({ data: { message: 'There was an error trying to update password', err }})
  }

  else {
    res.status(500).json({ data: { message: "MY fault"}})
  }
})
export default app;