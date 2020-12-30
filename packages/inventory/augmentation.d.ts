import 'fastify-cors';
import 'fastify-swagger';
import 'fastify-jwt';
import { User } from 'database/models/user.entity';

declare module 'fastify' {
  export interface FastifyInstance {
    env: NodeJS.ProcessEnv;
    authenticate: (req: FastifyRequest) => Promise<void>;
  }
  export interface FastifyRequest {
    user?: User;
  }
  export interface RouteOptions {
    swagger: any;
  }
}
