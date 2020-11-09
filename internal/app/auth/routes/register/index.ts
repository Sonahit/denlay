import { getConnection } from '../internal/plugins/node_modules/typeorm';
import { User } from '@database/models/user.entity';
import { HttpStatus } from '../internal/plugins/node_modules/@enums/HttpStatus';
import { BadRequestException } from '@exceptions/BadRequestException';
import { FastifyRoute, MessageResponse } from '../../../../types';
import { sha256 } from '@utils/hash';
import { register } from './service';
import { registerSchema } from './schemas';

export const post: FastifyRoute = (fastify) =>
  fastify.post('/register', {
    schema: registerSchema,
    preHandler: (req, _, done) => {
      const badDone = done.bind(null, new BadRequestException());
      if (!req.body) {
        badDone();
      }

      const { password, confirmPassword } = req.body as Record<string, string>;

      if (password !== confirmPassword) {
        badDone();
      }

      done();
    },
    handler: async (req): Promise<MessageResponse> => {
      const { email, password } = req.body as Record<string, string>;
      await register(email, password);
      return { message: 'messages.ok' };
    },
  });
export default [post];
