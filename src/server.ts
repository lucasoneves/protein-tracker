import express from 'express';
import router from './router';
import { protect } from './modules/auth';
import { signup, signin } from './handlers/auth';
import { forgotPasswordHandler, resetPasswordHandler, sendNewPassword } from './handlers/password';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', protect, router);

// Users routes
app.post('/signup', signup);
app.post('/signin', signin)

app.post('/forgot-password', forgotPasswordHandler);
// app.get('/forgot-password', (req, res) => {});

app.get('/reset-password/:id/:token', resetPasswordHandler, (req, res, next) => {
  
});
app.post('/reset-password/:id/:token', sendNewPassword, (req, res) => {})

export default app;