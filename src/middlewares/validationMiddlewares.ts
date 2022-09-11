import { ObjectSchema, ValidationResult } from 'joi';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function validateBody<type>(schema: ObjectSchema<type>): RequestHandler {
  return function (
    req: Request,
    res: Response<any, Record<string, type>>,
    next: NextFunction
  ): Response | void {
    const validation: ValidationResult<type> = schema.validate(req.body);
    if (validation.error) {
      return res.status(422).json(validation.error);
    }

    res.locals.reqBody = validation.value;
    return next();
  }
}

export function validateHeader(schema: ObjectSchema): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): Response | void {
    const validation: ValidationResult = schema.validate(req.headers);
    if (validation.error) {
      return res.status(401).json(validation.error);
    }
    return next();
  }
}
