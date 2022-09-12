import Joi from 'joi';

import { UserCreationData } from '../types/userTypes';
import { HeaderType } from '../types/requestTypes';

export const credentialSchema: Joi.ObjectSchema<UserCreationData> = Joi
  .object<UserCreationData, true>({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(10).required(),
  });

export const headerSchema: Joi.ObjectSchema<HeaderType> = Joi
  .object<HeaderType, true>({
    authentication: Joi.string().trim().pattern(/^Bearer .+/).required(),
  }).unknown(true);
