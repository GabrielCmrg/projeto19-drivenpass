import Cryptr from 'cryptr';
import dotenv from 'dotenv';

import {
  Credential,
  CredentialData,
  CredentialCreationData
} from '../types/credentialTypes';
import { credentialRepository } from '../repositories';
import { conflictException } from '../exceptions';

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
