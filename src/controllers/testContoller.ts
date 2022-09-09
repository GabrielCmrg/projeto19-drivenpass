import { Request, Response } from 'express';

export async function test(req: Request, res: Response) {
  console.log('Working');
  return res.send('Working');
}
