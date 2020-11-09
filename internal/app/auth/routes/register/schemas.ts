import { FastifySchema } from '../internal/plugins/node_modules/fastify';

export const registerSchema: FastifySchema = {
  description: 'Регистрация',
  body: {
    required: ['email', 'password', 'confirmPassword'],
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
      confirmPassword: {
        type: 'string',
        minLength: 1,
      },
    },
  },
};
