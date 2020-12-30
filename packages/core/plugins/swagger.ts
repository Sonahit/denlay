import { FastifyInstance, FastifySchema } from 'fastify';
import fp from 'fastify-plugin';
import { ObjectLiteral } from 'typeorm';
import { HttpStatus } from '../enums/HttpStatus';
import { registerHttpSchema } from '../schemas/http/http';
import { HttpSchemas } from '../schemas/http/http-schemas.enum';
import { enumToArray } from '../utils/enumToArray';
import jwtSchema from '../schemas/http/jwt-schema';

const swaggerFp = (fastify: FastifyInstance, _: any, next: (err?: Error) => void) => {
  const register = registerHttpSchema(fastify);
  jwtSchema(fastify);

  enumToArray(HttpStatus).forEach((s) => register(+s));
  fastify.addHook('onRoute', (h) => {
    const schema: FastifySchema & { response: any } = {
      response: {
        [HttpStatus.BadRequest]: { $ref: HttpSchemas.BadRequest },
        [HttpStatus.Unauthorized]: { $ref: HttpSchemas.Unauthorized },
        [HttpStatus.Forbidden]: { $ref: HttpSchemas.Forbidden },
      },
    };
    if (h.schema) {
      h.schema.response = { ...schema.response, ...(h.schema as ObjectLiteral).response };
    }
  });

  next();
};

export default fp(swaggerFp, {
  fastify: '>=3.x',
  name: 'swagger',
});
