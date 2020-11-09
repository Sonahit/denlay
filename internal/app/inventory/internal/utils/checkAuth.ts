import { UnauthorizedException } from '~pkg/exceptions/UnauthorizedException';
import { FastifyRequest } from 'fastify';
import { CheckRequest } from 'internal/clients/requests/CheckRequest';
import { CheckResponse } from 'internal/clients/responses/CheckResponse';
import { auth } from '../clients/auth';
import { getRepository } from 'typeorm';
import { User } from 'database/models/user.entity';

export default async (req: FastifyRequest) => {
  const { response = false } = (await auth.send<CheckRequest>({
    type: 'check',
    jwt: '' + (req.headers.authorization || req.headers.jwt),
  })) as CheckResponse;
  if (typeof response === 'boolean') {
    throw new UnauthorizedException();
  }
  req.user = await getRepository(User).findOne({ where: { email: response.email } });
};
