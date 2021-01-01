import 'reflect-metadata';
import cors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import fastifyJwt from 'fastify-jwt';
import { createConnection } from 'typeorm';
import _fastify from 'fastify';
import plgEnv from '@denlay/core/plugins/env';
import errorHandler from '@denlay/core/plugins/error-handler';
import payloadHandler from '@denlay/core/plugins/payload-handler';
import swagger from '@denlay/core/plugins/swagger';
import { Container } from '@denlay/core/core/Container';
import { JwtService } from './services/jwt.service';
import './internal/index';
import routes from './routes';

const fastify = _fastify({
  ignoreTrailingSlash: true,
  logger: process.env.NODE_ENV === 'testing' ? false : true,
  ajv: {
    customOptions: {
      allErrors: true,
      jsonPointers: false,
      coerceTypes: true,
      validateSchema: false,
    },
  },
});

fastify
  .register(payloadHandler)
  .register(errorHandler)
  .register((f, _, n) => {
    Container.bind(JwtService, new JwtService(f));
    n();
  })
  .register(plgEnv)
  .register(cors)
  .register(fastifySwagger, {
    routePrefix: '/docs',
    exposeRoute: true,
  })
  .register(fastifyJwt, { secret: process.env.SECRET || 'secret' })
  .register(swagger);

routes(fastify);

fastify.ready(() => {
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

export default fastify;
