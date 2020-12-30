import { JwtBlacklist } from '../database/models/jwt-blacklist.entity';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { ForbiddenException } from '~pkg/exceptions/ForbiddenException';
import { UnauthorizedException } from '~pkg/exceptions/UnauthorizedException';
import { getConnection, getRepository } from 'typeorm';
import { User } from '../database/models/user.entity';
import { BadRequestException } from '~pkg/exceptions/BadRequestException';
import { UserDto } from '~pkg/dto/user.dto';
import userMapper from 'mappers/user.mapper';

export class JwtService {
  constructor(private fastifyInstance: FastifyInstance) {}

  parseJwt = (str: string): string => {
    return (str.startsWith('Bearer') ? str.replace('Bearer', '') : str).trim();
  };

  blacklist = async (_jwt: string): Promise<void> => {
    const jwt = this.parseJwt(_jwt);
    return getConnection().manager.transaction(async (em) => {
      const rep = em.getRepository(JwtBlacklist);

      const entity = await rep.findOne({ where: { jwt } });
      if (!entity) await rep.save({ jwt });
    });
  };

  isBlacklisted = async (_jwt?: string): Promise<true | UserDto> => {
    if (!_jwt) {
      throw new BadRequestException();
    }

    const jwt = this.parseJwt(_jwt);
    const rep = getRepository(JwtBlacklist);
    const { id } = this.fastifyInstance.jwt.decode(jwt) as { id: number };
    const isBlacklisted = !!(await rep.findOne({ where: { jwt } }));
    if (isBlacklisted) {
      return true;
    }
    return userMapper.toDto(await getRepository(User).findOneOrFail({ where: { id } }));
  };

  verifyJwt = async (request: FastifyRequest) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      throw new UnauthorizedException();
    }
    if (this.isBlacklisted(request.headers.authorization)) {
      throw new ForbiddenException();
    }
  };

  removeFromBlacklist = async (_jwt: string): Promise<void> => {
    const jwt = this.parseJwt(_jwt);
    return getConnection().manager.transaction(async (em) => {
      const rep = em.getRepository(JwtBlacklist);

      const entity = await rep.findOne({ where: { jwt } });
      if (entity) await rep.delete(entity);
    });
  };
}
