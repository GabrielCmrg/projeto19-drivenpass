import { Router } from 'express';

import { testContoller } from '../controllers';

const testRouter: Router = Router();

testRouter.get('/', testContoller.test);

export default testRouter;
