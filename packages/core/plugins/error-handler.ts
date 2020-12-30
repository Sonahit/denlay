import { HttpStatus } from '../enums/HttpStatus';
import { HttpException } from '../exceptions/HttpException';
import { FastifyError, FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { ErrorResponse } from '../interfaces/ErrorResponse';

const errorHandlerFp = (fastify: FastifyInstance, _: any, next: (err?: Error) => void) => {
  fastify.setErrorHandler((err: FastifyError | HttpException, req, res) => {
    const code = err.statusCode ? err.statusCode : HttpStatus.InternalError;
    const payload: ErrorResponse = {
      code,
      message: err.message,
      status: false,
    };

    res.code(code);

    res.send(payload);
  });

  next();
};

export default fp(errorHandlerFp, {
  fastify: '>=3.x',
  name: 'error-handler',
});
