import express from 'express';
import router from './router';
import { protect } from './modules/auth';
import { signup, signin, forgotPassword } from './handlers/auth';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', protect, router);

// Users routes
app.post('/signup', signup);
app.post('/signin', signin)

app.post('/forgotpassword', forgotPassword);


export default app;