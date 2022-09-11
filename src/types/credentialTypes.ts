import { Credential } from '@prisma/client';

export { Credential };
export type CredentialCreationData = Omit<Credential, 'id'>;
export type CredentialData = Omit<Credential, 'password'>;
export type CredentialComposition = Pick<Credential, 'title' | 'ownerId'>;
