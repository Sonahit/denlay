import { FastifyInstance } from '../internal/plugins/node_modules/fastify';
import auth from './auth/index';
import forget from './forget/index';
import register from './register/index';
import ping from './ping';
import { FastifyRoute } from '../../../types/index';

export default (fastify: FastifyInstance) => {
  const registerRoute = (route: FastifyRoute) => route(fastify);

  auth.forEach(registerRoute);
  forget.forEach(registerRoute);
  register.forEach(registerRoute);
  ping.forEach(registerRoute);
};
