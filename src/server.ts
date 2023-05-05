import express from 'express';
import router from './router';
import { protect } from './modules/auth';
import { signup, signin } from './handlers/user';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', protect, router);
app.post('/signup', express.urlencoded({ extended: true}), signup);
app.post('/signin', signin)


export default app;