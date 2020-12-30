import { BadRequestException } from '@denlay/core/exceptions/BadRequestException';
import { FastifyRoute, MessageResponse } from '@denlay/core/types';
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
