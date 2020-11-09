import 'reflect-metadata';
import _fastify from '../internal/plugins/node_modules/fastify';
import cors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import { createConnection } from '../internal/plugins/node_modules/typeorm';
import plgEnv from '@plugins/env';
import swagger from '@plugins/swagger';
import routes from './routes';
import errorHandler from '@plugins/error-handler';
import payloadHandler from '@plugins/payload-handler';
import checkAuth from 'internal/utils/checkAuth';

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
  swagger: {
    definitions: {
      Inv: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          userId: { type: 'number' },
          cells: { type: 'number' },
          items: { type: 'array', items: { $ref: '#/definitions/InvItem' } },
        },
      },
      InvItem: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          count: { type: 'number' },
          cell: { type: 'number' },
          inventoryId: { type: 'number' },
        },
      },
    },
    securityDefinitions: {
      apiKey: {
        type: 'apiKey',
        name: 'jwt',
        in: 'header',
      },
    },
  },
});

fastify.register(swagger);

fastify.decorate('authenticate', checkAuth);

routes(fastify);

fastify.ready(() => {
  createConnection()
    .then(() => fastify.log.info('Connected to db'))
    .catch(console.error);
});

export default fastify;
