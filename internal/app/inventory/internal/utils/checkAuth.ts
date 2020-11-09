import { UnauthorizedException } from '@exceptions/UnauthorizedException';
import { FastifyRequest } from '../internal/plugins/node_modules/fastify';
import { CheckRequest } from 'internal/clients/requests/CheckRequest';
import { CheckResponse } from 'internal/clients/responses/CheckResponse';
import { NextFn } from 'types';
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
