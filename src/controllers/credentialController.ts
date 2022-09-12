import { Request, Response } from 'express';

import {
  Credential,
  CredentialCreationData,
  CredentialData,
  CredentialRequestData
} from '../types/credentialTypes';
import { credentialService } from '../services';
import { LocalsType } from '../types/requestTypes';
import { notFoundException } from '../exceptions';

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

export async function searchUserCredentials(
  req: Request,
  res: Response<any, LocalsType>
): Promise<Response> {
  const userId: number = res.locals.userId;
  const credentials: Credential[] = await credentialService.retrieveUserCredentials(userId);
  return res.status(200).json(credentials);
}

export async function searchCredential(
  req: Request<{ credentialId: string }>,
  res: Response<any, LocalsType>
): Promise<Response> {
  const credentialId: number = Number(req.params.credentialId);
  if (isNaN(credentialId)) {
    throw notFoundException('The credential you are trying to see doesn\'t exist');
  }
  const userId: number = res.locals.userId;
  const credential: Credential = await credentialService.retrieveCredential(credentialId, userId);
  return res.status(200).json(credential);
}

export async function deleteCredential(
  req: Request<{ credentialId: string }>,
  res: Response<any, LocalsType>
): Promise<Response> {
  const credentialId: number = Number(req.params.credentialId);
  if (isNaN(credentialId)) {
    throw notFoundException('The credential you are trying to delete doesn\'t exist');
  }
  const userId: number = res.locals.userId;
  await credentialService.deleteUserCredential(credentialId, userId);
  return res.sendStatus(204);
}
