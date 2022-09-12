import { Router } from 'express';

import { credentialController } from '../controllers';
import { validationMiddlewares } from '../middlewares';
import { credentialSchemas } from '../schemas';

const credentialRouter: Router = Router();

credentialRouter.post(
  '/credentials',
  validationMiddlewares.validateBody(credentialSchemas.credentialRequestSchema),
  validationMiddlewares.validateHeader,
  credentialController.createCredential
);

export default credentialRouter;
