import bcrypt from 'bcrypt';

import { User, UserData, UserCreationData } from '../types/userTypes';
import { userRepository } from '../repositories';
import { conflictException } from '../exceptions';

export async function registerNewUser(user: UserCreationData): Promise<UserData> {
  const existingUser: User | null = await userRepository.getUserByEmail(user.email);
  if (existingUser) {
    throw conflictException('There is a user with this email.');
  }
  const hashPassword: string = bcrypt.hashSync(user.password, 10);
  const userToSave: UserCreationData = { email: user.email, password: hashPassword };
  const createdUser: User = await userRepository.createUser(userToSave);
  const returningUser: UserData = { id: createdUser.id, email: createdUser.email };
  return returningUser;
}
