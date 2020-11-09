import 'reflect-metadata';
import './internal/index';
import _fastify from '../internal/plugins/node_modules/fastify';
import cors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import fastifyJwt from 'fastify-jwt';
import { createConnection } from '../internal/plugins/node_modules/typeorm';
import plgEnv from '@plugins/env';
import swagger from '@plugins/swagger';
import routes from './routes';
import errorHandler from '@plugins/error-handler';
import payloadHandler from '@plugins/payload-handler';
import { verifyJwt } from '@services/jwt.service';

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

fastify.register(plgEnv);
fastify.register(cors);
fastify.register(fastifySwagger, {
  routePrefix: '/docs',
  exposeRoute: true,
});

fastify.register(fastifyJwt, { secret: process.env.SECRET || 'secret' });

fastify.decorate('authenticate', verifyJwt);

fastify.register(swagger);

routes(fastify);

fastify.ready(() => {
  createConnection()
    .then(() => fastify.log.info('Connected to db'))
    .catch(console.error);
});

export default fastify;
