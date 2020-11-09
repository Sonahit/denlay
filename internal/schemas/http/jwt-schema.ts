import { FastifyInstance } from '../internal/plugins/node_modules/fastify';

export default function (fastify: FastifyInstance) {
  const code = 200;
  fastify.addSchema({
    $id: `schema.http.jwt`,
    title: `http.${code}`,
    type: 'object',
    properties: {
      status: {
        type: 'boolean',
        example: true,
      },
      code: {
        type: 'number',
        example: code,
      },
      message: {
        type: 'string',
        example: `messages.http.${code}`,
      },
      data: {
        type: 'object',
        properties: {
          jwt: {
            type: 'string',
            example: 'header.body.sign',
          },
        },
      },
    },
  });
}
