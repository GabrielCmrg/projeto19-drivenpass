import express, { Express } from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';

import router from './routers';
import { errorMiddleware } from './middlewares';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorMiddleware.errorHandler);

const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
