import { Request, Response } from 'express';

import { UserCreationData, UserData } from '../types/userTypes';
import { userService } from '../services';

export async function signup(
  req: Request,
  res: Response<any, Record<string, UserCreationData>>
): Promise<Response> {
  const credentials: UserCreationData = res.locals.reqBody;
  const createdUser: UserData = await userService.registerNewUser(credentials);
  return res.status(201).json(createdUser);
}

export async function login(
  req: Request,
  res: Response<any, Record<string, UserCreationData>>
): Promise<Response> {
  const credentials: UserCreationData = res.locals.reqBody;
  const token: string = await userService.loginUser(credentials);
  return res.status(201).json({ token });
}
