import { FastifyInstance } from 'fastify';
import { HttpStatus } from '../../enums/HttpStatus';

export const registerHttpSchema = (fastify: FastifyInstance) => (code: number, message?: string, status?: boolean) => {
  if (status === undefined) {
    status = code >= HttpStatus.BadRequest ? false : true;
  }

  if (!message) {
    message = !status ? `errors.http.${code}` : `messages.http.${code}`;
  }

  fastify.addSchema({
    $id: `schema.http.${code}`,
    title: `http.${code}`,
    type: 'object',
    properties: {
      status: {
        type: 'boolean',
        example: status,
      },
      code: {
        type: 'number',
        example: code,
      },
      message: {
        type: 'string',
        example: message,
      },
    },
  });
};
