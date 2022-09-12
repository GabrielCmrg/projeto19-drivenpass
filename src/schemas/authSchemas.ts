import Joi from 'joi';

import { UserCreationData } from '../types/userTypes';

export const credentialSchema: Joi.ObjectSchema<UserCreationData> = Joi
  .object<UserCreationData, true>({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(10).required(),
  });

export const headerSchema: Joi.ObjectSchema<{ authentication: string }> = Joi
  .object<{ authentication: string }, true>({
    authentication: Joi.string().trim().pattern(/^Bearer .+/).required(),
  }).unknown(true);
