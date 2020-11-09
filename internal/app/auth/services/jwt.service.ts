import { JwtBlacklist } from '../database/models/jwt-blacklist.entity';
import { FastifyRequest } from 'fastify';
import { ForbiddenException } from '~pkg/exceptions/ForbiddenException';
import { UnauthorizedException } from '~pkg/exceptions/UnauthorizedException';
import { getConnection, getRepository } from 'typeorm';

export const parseJwt = (str: string): string => {
  return (str.startsWith('Bearer') ? str.replace('Bearer', '') : str).trim();
};

export const blacklist = async (_jwt: string): Promise<void> => {
  const jwt = parseJwt(_jwt);
  return getConnection().manager.transaction(async (em) => {
    const rep = em.getRepository(JwtBlacklist);

    const entity = await rep.findOne({ where: { jwt } });
    if (!entity) await rep.save({ jwt });
  });
};

export const isBlacklisted = async (_jwt?: string): Promise<boolean> => {
  if (!_jwt) {
    return true;
  }

  const jwt = parseJwt(_jwt);
  const rep = getRepository(JwtBlacklist);

  const entity = await rep.findOne({ where: { jwt } });
  return !!entity;
};

export const verifyJwt = async (request: FastifyRequest) => {
  try {
    await request.jwtVerify();
  } catch (err) {
    throw new UnauthorizedException();
  }
  if (isBlacklisted(request.headers.authorization)) {
    throw new ForbiddenException();
  }
};

export const removeFromBlacklist = async (_jwt: string): Promise<void> => {
  const jwt = parseJwt(_jwt);
  return getConnection().manager.transaction(async (em) => {
    const rep = em.getRepository(JwtBlacklist);

    const entity = await rep.findOne({ where: { jwt } });
    if (entity) await rep.delete(entity);
  });
};
