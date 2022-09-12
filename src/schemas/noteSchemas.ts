import Joi from 'joi';

import { NoteRequestData } from '../types/noteTypes';

export const credentialRequestSchema: Joi.ObjectSchema<NoteRequestData> = Joi
  .object<NoteRequestData, true>({
    title: Joi.string().trim().max(50).required(),
    body: Joi.string().trim().max(1000).required(),
  });
