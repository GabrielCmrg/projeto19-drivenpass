import { Router } from 'express';

import testRouter from './authRouter';

const router: Router = Router();

router.use(testRouter);

export default router;
