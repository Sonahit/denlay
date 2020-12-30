import { HttpSchemas } from '@denlay/core/schemas/http/http-schemas.enum';
import { FastifySchema } from 'fastify';
import { JSONSchema7 } from 'json-schema';

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
  } as JSONSchema7,
  response: {
    '2xx': {
      $ref: HttpSchemas.JWT,
    } as JSONSchema7,
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
