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
app.post('/signin', signin)

app.post('/forgot-password', forgotPasswordHandler);
// app.get('/forgot-password', (req, res) => {});

app.get('/reset-password/:id/:token', resetPasswordHandler, (req, res, next) => {

});
app.post('/reset-password/:id/:token', body('password').isString(), body('confirm_password').isString(), handleInputErrors, sendNewPassword, (req, res) => { })

export default app;