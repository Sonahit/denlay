import './responders/auth';
import fp from 'fastify-plugin';
import { FastifyInstance } from 'fastify';

export default fp((fastify: FastifyInstance, __: any, done: (err?: Error) => void) => {
  done();
});
