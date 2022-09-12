export interface CustomError {
  type: 'conflict' | 'unauthorized' | 'not_found' | 'forbidden';
  message: string;
};

export function conflictException(message: string): CustomError {
  return { type: 'conflict', message };
}

export function unauthorizedException(message: string): CustomError {
  return { type: 'unauthorized', message };
}

export function notFoundException(message: string): CustomError {
  return { type: 'not_found', message };
}

export function forbiddenException(message: string): CustomError {
  return { type: 'forbidden', message };
}
