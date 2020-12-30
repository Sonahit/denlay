import { JwtService } from 'services/jwt.service';
import { Container } from '~pkg/core/Container';
import { BadRequestException } from '~pkg/exceptions/BadRequestException';
import { FastifyRoute, JWTResponse, MessageResponse } from '~pkg/types';
import { authSchema, unauthSchema } from './schemas';
import { authorize } from './service';

export const auth: FastifyRoute = (fastify) =>
  fastify.post('/auth', {
    schema: authSchema,
    handler: async (req): Promise<JWTResponse> => {
      const { email, password } = req.body as Record<string, string>;
      try {
        const jwt = await authorize(fastify.jwt)(email, password);
        return {
          data: {
            jwt,
          },
        };
      } catch (e) {
        throw new BadRequestException();
      }
    },
  });

export const unauth: FastifyRoute = (fastify) =>
  fastify.post('/signout', {
    schema: unauthSchema,
    preValidation: [(req) => Container.get<JwtService>(JwtService).verifyJwt(req)],
    handler: async (req): Promise<MessageResponse> => {
      const { authorization } = req.headers as { authorization: string };
      await Container.get<JwtService>(JwtService).blacklist(authorization);
      try {
        return {
          message: 'messages.ok',
        };
      } catch (e) {
        throw new BadRequestException();
      }
    },
  });
export default [unauth, auth];
