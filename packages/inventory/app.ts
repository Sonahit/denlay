import 'reflect-metadata';
import _fastify from 'fastify';
import cors from 'fastify-cors';
import fastifySwagger from 'fastify-swagger';
import { createConnection } from 'typeorm';
import plgEnv from '~pkg/plugins/env';
import swagger from '~pkg/plugins/swagger';
import routes from './routes';
import errorHandler from '~pkg/plugins/error-handler';
import payloadHandler from '~pkg/plugins/payload-handler';
import checkAuth from './internal/utils/checkAuth';
import { JSONSchema7 } from 'json-schema';

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
      definitions: {
        Inv: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            userId: { type: 'number' },
            cells: { type: 'number' },
            items: { type: 'array', items: { $ref: '#/definitions/InvItem' } },
          },
        } as JSONSchema7,
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
        } as JSONSchema7,
      },
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
    createConnection()
      .then(() => fastify.log.info('Connected to db'))
      .catch(console.error);
  });

routes(fastify);

export default fastify;
