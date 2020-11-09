import { User } from '@database/models/user.entity';
import { BadRequestException } from '@exceptions/BadRequestException';
import { sha256 } from '@utils/hash';
import { getConnection } from '../internal/plugins/node_modules/typeorm';

export const register = (email: string, password: string): Promise<User> => {
  return getConnection().transaction(async (em) => {
    const userRep = em.getRepository(User);

    const u = await userRep.findOne({
      email,
    });

    if (u) {
      throw new BadRequestException();
    }

    return await userRep.save(
      userRep.create({
        email,
        password: sha256(password),
      })
    );
  });
};
