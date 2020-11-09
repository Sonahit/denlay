import { User } from '@database/models/user.entity';
import { BadRequestException } from '@exceptions/BadRequestException';
import { sha256 } from '@utils/hash';
import { getConnection } from '../internal/plugins/node_modules/typeorm';
type JWT = string;

export const authorize = (jwtService: { sign: (...args: any[]) => string }) => (
  email: string,
  password: string
): Promise<JWT> => {
  return getConnection().transaction(async (em) => {
    const userRep = em.getRepository(User);

    const u = await userRep.findOne({
      email,
    });

    if (!u || u.password !== sha256(password)) {
      throw new BadRequestException();
    }

    const jwt = jwtService.sign({ id: u.id }, { mutatePayload: true, noTimestamp: false, expiresIn: '1h' });

    return jwt;
  });
};