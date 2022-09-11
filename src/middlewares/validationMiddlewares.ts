import { ObjectSchema, ValidationResult } from 'joi';
import { Request, Response, NextFunction } from 'express';

export function validateBody(schema: ObjectSchema): Function {
  return function (req: Request, res: Response, next: NextFunction): Response | void {
    const validation: ValidationResult = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).json(validation.error);
    }
    return next();
  }
}

export function validateHeader(schema: ObjectSchema): Function {
  return function (req: Request, res: Response, next: NextFunction): Response | void {
    const validation: ValidationResult = schema.validate(req.headers);
    if (validation.error) {
      return res.status(401).json(validation.error);
    }
    return next();
  }
}
