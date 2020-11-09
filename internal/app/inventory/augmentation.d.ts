import 'fastify-cors';
import 'fastify-swagger';
import 'fastify-jwt';

declare module 'fastify' {
  export interface FastifyInstance {
    env: NodeJS.ProcessEnv;
    authenticate: (req: FastifyRequest) => Promise<void>;
  }
  export interface RouteOptions {
    swagger: any;
  }
}
