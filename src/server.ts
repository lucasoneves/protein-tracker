import express from 'express';
import router from './router';
import { protect } from './modules/auth';
import { signup, signin } from './handlers/auth';
import { forgotPasswordHandler } from './handlers/password';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', protect, router);

// Users routes
app.post('/signup', signup);
app.post('/signin', signin)

app.post('/forgot-password', forgotPasswordHandler, (req, res) => {
  
});
// app.get('/forgot-password', (req, res) => {});

app.get('/reset-password', (req, res) => {});
app.post('/reset-password', (req, res) => {})

export default app;