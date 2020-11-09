import { UnauthorizedException } from '~pkg/exceptions/UnauthorizedException';
import { FastifyRequest } from 'fastify';
import { CheckRequest } from 'internal/clients/requests/CheckRequest';
import { CheckResponse } from 'internal/clients/responses/CheckResponse';
import { auth } from '../clients/auth';

export default async (req: FastifyRequest) => {
  const resp = await auth.send<CheckRequest>({ type: 'check', jwt: '' + req.headers.authorization });
  let json;
  try {
    json = JSON.parse(resp) as CheckResponse;
  } catch (e) {
    throw new UnauthorizedException();
  }
  if (!json.response) {
    throw new UnauthorizedException();
  }
};
