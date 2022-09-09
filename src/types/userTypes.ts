import { User } from '@prisma/client';

export { User };

export type UserCreationData = Omit<User, 'id'>;
