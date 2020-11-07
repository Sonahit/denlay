import { FastifyInstance } from 'fastify';
import ping from './ping';
import { FastifyRoute } from '../types/index';

export default (fastify: FastifyInstance) => {
  const registerRoute = (route: FastifyRoute) => route(fastify);

  ping.forEach(registerRoute);
};
