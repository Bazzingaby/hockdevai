import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT ?? 4000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'AlphaForge API is running. Use /api for resources.'
  });
});

app.listen(port, () => {
  console.log(`AlphaForge server listening on port ${port}`);
});
