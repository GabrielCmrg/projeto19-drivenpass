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
