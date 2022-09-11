import { Router } from 'express';

import { userController } from '../controllers';
import { validationMiddlewares } from '../middlewares';
import { authSchemas } from '../schemas';

const authRouter: Router = Router();

authRouter.post(
  '/sign-up',
  validationMiddlewares.validateBody(authSchemas.credentialSchema),
  userController.signup
);
authRouter.post(
  '/login',
  validationMiddlewares.validateBody(authSchemas.credentialSchema),
  userController.login
);

export default authRouter;
