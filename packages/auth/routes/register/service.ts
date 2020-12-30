import { User } from '../../database/models/user.entity';
import { BadRequestException } from '~pkg/exceptions/BadRequestException';
import { sha256 } from '~pkg/utils/hash';
import { getConnection } from 'typeorm';

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
