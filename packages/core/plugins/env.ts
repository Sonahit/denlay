import fp from 'fastify-plugin';
import { DotenvConfigOptions } from 'dotenv/types';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { FastifyInstance } from 'fastify';

const dotenvFp = (fastify: FastifyInstance, denv: DotenvConfigOptions, next: (err?: Error) => void) => {
  if (!denv || !denv.path) {
    if (!denv) {
      denv = {};
    }
    denv.path = resolve(__dirname, '..', '..', '..', '.env');
  }
  dotenv.config(denv);
  (fastify as any).env = process.env;

  next();
};

export default fp(dotenvFp, {
  fastify: '>=3.x',
  name: 'dotenv',
});
