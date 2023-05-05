import express from 'express';
import { protect } from './modules/auth';
import router from './router';

const app = express();

app.use('/api', protect, router);

export default app;