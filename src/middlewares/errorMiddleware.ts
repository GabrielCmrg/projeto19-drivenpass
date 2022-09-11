import { NextFunction, Request, Response } from 'express';

import { CustomError } from '../exceptions';

const hash = {
  'conflict': 409,
};

export function errorHandler(
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(error);
  if ('type' in error) {
    return res.status(hash[error.type]).send(error.message);
  }
  return res.status(500).send('Something broke internally.');
}
