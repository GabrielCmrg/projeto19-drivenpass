export interface CustomError {
  type: 'conflict';
  message: string;
};

export function conflictException(message: string): CustomError {
  return { type: 'conflict', message };
}
