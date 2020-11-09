import { HttpSchemas } from '@schemas/http/http-schemas.enum';
import { FastifySchema } from '../internal/plugins/node_modules/fastify';

export const authSchema: FastifySchema = {
  description: 'Авторизация',
  body: {
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        minLength: 3,
      },
      password: {
        type: 'string',
        minLength: 1,
      },
    },
  },
  response: {
    '2xx': {
      $ref: HttpSchemas.JWT,
    },
  },
};

export const unauthSchema: FastifySchema = {
  description: 'Разлогирование',
  headers: {
    type: 'object',
    required: ['authorization'],
    properties: {
      authorization: {
        type: 'string',
      },
    },
  },
  response: {
    '2xx': {
      $ref: HttpSchemas.OK,
    },
  },
};
