import 'reflect-metadata';
import './internal/index';
import _fastify from 'fastify';
import cors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import fastifyJwt from 'fastify-jwt';
import { createConnection } from 'typeorm';
import plgEnv from '~pkg/plugins/env';
import swagger from '~pkg/plugins/swagger';
import routes from './routes';
import errorHandler from '~pkg/plugins/error-handler';
import payloadHandler from '~pkg/plugins/payload-handler';
import { JwtService } from './services/jwt.service';
import { Container } from '~pkg/core/Container';

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

fastify.register(payloadHandler);
fastify.register(errorHandler);

fastify.register((f, _, n) => {
  Container.bind(JwtService, new JwtService(f));
  n();
});

fastify.register(plgEnv);
fastify.register(cors);
fastify.register(fastifySwagger, {
  routePrefix: '/docs',
  exposeRoute: true,
});

fastify.register(fastifyJwt, { secret: process.env.SECRET || 'secret' });

fastify.register(swagger);

routes(fastify);

fastify.ready(() => {
  createConnection()
    .then(() => fastify.log.info('Connected to db'))
    .catch(console.error);
});

export default fastify;
