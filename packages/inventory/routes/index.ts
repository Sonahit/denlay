import { FastifyInstance } from 'fastify';
import pingRouter from './ping';
import inventoryRouter from './inventory/index';
import fp from 'fastify-plugin';

export default fp((fastify: FastifyInstance, _: any, done: (err?: Error) => void) => {
  pingRouter(fastify);
  fastify.register(inventoryRouter);
  done();
});
