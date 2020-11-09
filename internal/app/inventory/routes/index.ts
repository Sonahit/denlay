import { FastifyInstance } from 'fastify';
import ping from './ping';
import inventory from './inventory/index';
import { FastifyRoute } from '~pkg/types/index';

export default (fastify: FastifyInstance) => {
  const registerRoute = (route: FastifyRoute) => route(fastify);

  ping.forEach(registerRoute);
  inventory.forEach(registerRoute);
};
