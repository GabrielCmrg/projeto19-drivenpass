import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../exceptions';

const hash = {
  'conflict': 409,
  'unauthorized': 401,
};

export function errorHandler(
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  if ('type' in error) {
    const statusCode: number = hash[error.type] || 400;
    return res.status(statusCode).send(error.message);
  }
  return res.status(500).send('Something broke internally.');
}
