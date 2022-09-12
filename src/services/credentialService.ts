import Cryptr from 'cryptr';
import dotenv from 'dotenv';

import {
  Credential,
  CredentialData,
  CredentialCreationData
} from '../types/credentialTypes';
import { credentialRepository } from '../repositories';
import { conflictException, forbiddenException, notFoundException } from '../exceptions';

dotenv.config();
const secretKey: string = process.env.CRYPTR_SECRET || 'secret';
const cryptr = new Cryptr(secretKey);

export async function makeNewCredential(
  credential: CredentialCreationData
): Promise<CredentialData> {
  const existingCredential: Credential | null = await credentialRepository
    .getCredentialByComposition({
      title: credential.title, ownerId: credential.ownerId
    });
  if (existingCredential) {
    throw conflictException('You already have a credential with this title.');
  }

  const encryptedPassword: string = cryptr.encrypt(credential.password);
  const credentialToSave: CredentialCreationData = {
    ...credential,
    password: encryptedPassword,
  };
  type IntermediaryType = CredentialData & Partial<Pick<Credential, 'password'>>;
  const createdCredential: IntermediaryType = await credentialRepository
    .createCredential(credentialToSave);
  delete createdCredential.password;
  const returningCredential: CredentialData = createdCredential;
  return returningCredential;
}

export async function retrieveUserCredentials(userId: number): Promise<Credential[]> {
  const credentials: Credential[] = await credentialRepository.getUserCredentials(userId);
  credentials.forEach((credential) => {
    const password: string = credential.password;
    const decriptedPassword: string = cryptr.decrypt(password);
    credential.password = decriptedPassword;
  });
  return credentials;
}

export async function retrieveCredential(
  credentialId: number,
  requerentId: number
): Promise<Credential> {
  const credential: Credential | null = await credentialRepository
    .getCredentialById(credentialId);
  if (!credential) {
    throw notFoundException('The credential you are trying to see doesn\'t exist');
  }
  if (credential.ownerId !== requerentId) {
    throw forbiddenException('You are not the owner of this credential.');
  }
  credential.password = cryptr.decrypt(credential.password);
  return credential;
}

export async function deleteUserCredential(
  credentialId: number,
  requerentId: number
): Promise<void> {
  const credential: Credential | null = await credentialRepository
    .getCredentialById(credentialId);
  if (!credential) {
    throw notFoundException('The credential you are trying to delete doesn\'t exist');
  }
  if (credential.ownerId !== requerentId) {
    throw forbiddenException('You are not the owner of this credential.');
  }
  await credentialRepository.deleteCredentialById(credentialId);
}
