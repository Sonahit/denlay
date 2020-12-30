import { FastifyInstance } from 'fastify';
import pingRouter from './ping';
import inventoryRouter from './inventory/index';

export default (fastify: FastifyInstance) => {
  pingRouter(fastify);
  inventoryRouter(fastify);
};
