import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routers';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(router);

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
