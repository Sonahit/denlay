import { UnauthorizedException } from '~pkg/exceptions/UnauthorizedException';
import { FastifyRequest } from 'fastify';
import { CheckRequest } from 'internal/clients/requests/CheckRequest';
import { CheckResponse } from 'internal/clients/responses/CheckResponse';
import { NextFn } from '~pkg/types';
import authClient from '../clients/auth';

export default async (req: FastifyRequest, _: any) => {
  const resp = await authClient.send<CheckRequest>({ type: 'check', jwt: '' + req.headers.authorization });
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
