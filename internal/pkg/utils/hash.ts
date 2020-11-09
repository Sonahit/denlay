import { createHmac } from 'crypto';

export const sha256 = (string: string) => {
  const secret = process.env.SECRET as string;
  return createHmac('sha256', secret).update(string).digest('hex');
};
