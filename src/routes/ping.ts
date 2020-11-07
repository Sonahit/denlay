import { FastifyRoute } from '../types/index';

export const get: FastifyRoute = (fastify) => {
  return fastify.get('/ping', {
    handler: async () => {
      return 'pong';
    },
  });
};

export default [get];
