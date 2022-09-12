import { client } from '../config/database';
import {
  Credential,
  CredentialComposition,
  CredentialCreationData
} from '../types/credentialTypes';

export async function createCredential(
  credential: CredentialCreationData
): Promise<Credential> {
  const createdCredential: Credential = await client.credential.create({ data: credential });
  return createdCredential;
}

export async function getCredentialByComposition(
  composition: CredentialComposition
): Promise<Credential | null> {
  const credential: Credential | null = await client.credential.findUnique({
    where: { title_ownerId: composition }
  });
  return credential;
}

export async function getUserCredentials(ownerId: number): Promise<Credential[]> {
  const credentials: Credential[] = await client.credential.findMany({
    where: { ownerId }
  });
  return credentials;
}

export async function getCredentialById(credentialId: number): Promise<Credential | null> {
  const credential: Credential | null = await client.credential.findUnique({
    where: { id: credentialId }
  });
  return credential;
}
