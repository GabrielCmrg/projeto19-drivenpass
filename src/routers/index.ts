import { Router } from 'express';

import testRouter from './test';

const router: Router = Router();

router.use(testRouter);

export default router;
