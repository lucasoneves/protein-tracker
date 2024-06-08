import express from 'express';
import router from './router';
import morgan from 'morgan';
import cors from 'cors';
import { protect } from './modules/auth';
import { signup, signin } from './handlers/auth';
import { body } from 'express-validator';
import { forgotPasswordHandler, resetPasswordHandler, sendNewPassword } from './handlers/password';
import { handleInputErrors } from './modules/middleware';

const app = express();

app.use(cors());
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.json({ message: 'hello'});
})

app.use('/api', protect, router);

// Users routes
app.post('/signup', body('username').isString().exists(), body('email').isString().notEmpty(), body('password').isString().notEmpty(), handleInputErrors, signup);
app.post('/signin', body('email').exists().isString(), body('password').exists().isString(), signin)

app.post('/forgot-password', body('email').exists().isString(), forgotPasswordHandler);
// app.get('/forgot-password', (req, res) => {});

app.get('/reset-password/:id/:token', resetPasswordHandler, (req, res, next) => {

});
app.post('/reset-password/:id/:token', body('password').notEmpty(), handleInputErrors, sendNewPassword)

app.use((err, req, res, next) => {
  const messageError = res.status(400).json({ errors: err})
  if (err.type === 'auth') {
    res.status(401).json({ errors: { message: "Not authorized" }})
  }

  else if (err.type === 'input') {
    res.status(400).json({ errors: { message: "Invalid input"}})
  }

  else if (err.type === 'error-handler') {
    messageError
  }

  else {
    res.status(500).json({ errors: { message: "MY fault"}})
  }
})
export default app;

// function cors(): any {
//   throw new Error('Function not implemented.');
// }
// function morgan(arg0: string): any {
//   throw new Error('Function not implemented.');
// }

