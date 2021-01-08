import 'reflect-metadata';
import _fastify from 'fastify';
import cors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import { createConnection } from 'typeorm';
import plgEnv from '@denlay/core/plugins/env';
import swagger from '@denlay/core/plugins/swagger';
import routes from './routes';
import errorHandler from '@denlay/core/plugins/error-handler';
import payloadHandler from '@denlay/core/plugins/payload-handler';
import checkAuth from './internal/utils/checkAuth';
import { JSONSchema7 } from 'json-schema';
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

const fastify = _fastify({
  ignoreTrailingSlash: true,
  logger: process.env.NODE_ENV === 'testing' ? false : true,
  ajv: {
    customOptions: {
      allErrors: true,
      validateSchema: true,
    },
  },
});

fastify
  .register(payloadHandler)
  .register(errorHandler)
  .register(plgEnv)
  .register(cors)
  .register(fastifySwagger as any, {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
      securityDefinitions: {
        apiKey: {
          type: 'apiKey',
          name: 'jwt',
          in: 'header',
        },
      },
    },
  })
  .register(swagger)
  .decorate('authenticate', checkAuth)
  .ready(() => {
    createConnection({
      type: 'postgres',
      host: String(process.env.DB_HOST),
      port: Number(process.env.DB_PORT),
      username: String(process.env.DB_USERNAME),
      password: String(process.env.DB_PASSWORD),
      database: String(process.env.DB_DATABASE),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      cli: {
        migrationsDir: __dirname + '/**/database/migrations',
      },
      synchronize: true,
    }).then(() => fastify.log.info('Connected to db'));
  });

routes(fastify);

export default fastify;
