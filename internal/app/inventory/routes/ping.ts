import { FastifyInstance } from 'fastify';

export default (fastify: FastifyInstance) => {
  return fastify.get('/ping', {
    handler: async () => {
      return 'pong';
    },
  });
};
