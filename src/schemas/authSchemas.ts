import Joi from 'joi';

import { UserCreationData } from '../types/userTypes';

export const credentialSchema: Joi.ObjectSchema<UserCreationData> = Joi
  .object<UserCreationData, true>({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().required(),
  });
