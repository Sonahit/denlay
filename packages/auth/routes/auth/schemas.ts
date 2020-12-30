import { HttpSchemas } from '~pkg/schemas/http/http-schemas.enum';
import { FastifySchema } from 'fastify';
import { JSonSCHEMA7 } from 'json-schema';

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
  } as JSonSCHEMA7,
  response: {
    '2xx': {
      $ref: HttpSchemas.JWT,
    } as JSonSCHEMA7,
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
