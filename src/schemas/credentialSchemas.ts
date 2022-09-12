import Joi from 'joi';

import { CredentialRequestData } from '../types/credentialTypes';

export const credentialRequestSchema: Joi.ObjectSchema<CredentialRequestData> = Joi
  .object<CredentialRequestData, true>({
    title: Joi.string().trim().required(),
    url: Joi.string().trim().uri().required(),
    username: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  });
