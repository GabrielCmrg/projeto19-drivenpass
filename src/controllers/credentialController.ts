import { Request, Response } from 'express';

import {
  CredentialCreationData,
  CredentialData,
  CredentialRequestData
} from '../types/credentialTypes';
import { credentialService } from '../services';
import { LocalsType } from '../types/requestTypes';

export async function createCredential(
  req: Request,
  res: Response<any, LocalsType<CredentialRequestData>>
): Promise<Response> {
  const credential: CredentialRequestData = res.locals.reqBody;
  const ownerId: number = res.locals.userId;
  const credentialToCreate: CredentialCreationData = { ...credential, ownerId };
  const createdCredential: CredentialData = await credentialService
    .makeNewCredential(credentialToCreate);
  return res.status(201).json(createdCredential);
}
