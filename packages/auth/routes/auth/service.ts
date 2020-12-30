import { User } from '../../database/models/user.entity';
import { BadRequestException } from '~pkg/exceptions/BadRequestException';
import { sha256 } from '~pkg/utils/hash';
import { getConnection } from 'typeorm';
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
