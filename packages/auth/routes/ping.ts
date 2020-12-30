import { FastifyRoute } from '@denlay/core/types/index';

export const get: FastifyRoute = (fastify) => {
  return fastify.get('/ping', {
    handler: async () => {
      return 'pong';
    },
  });
};

export default [get];
