import { client } from '../config/database';
import { User, UserCreationData } from '../types/userTypes';

export async function createUser(user: UserCreationData): Promise<User> {
  const createdUser: User = await client.user.create({ data: user });
  return createdUser;
}
