import fp from 'fastify-plugin';
import { DotenvConfigOptions } from 'dotenv/types';
import dotenv from 'dotenv';
import { resolve } from 'path';
import { TFastifyPlugin } from '../services/inventory/types';

const dotenvFp: TFastifyPlugin<DotenvConfigOptions> = (fastify, denv, next) => {
  if (!denv || !denv.path) {
    if (!denv) {
      denv = {};
    }
    denv.path = resolve(process.cwd(), '.env');
  }
  dotenv.config(denv);
  (fastify as any).env = process.env;

  next();
};

export default fp(dotenvFp, {
  fastify: '>=3.x',
  name: 'dotenv',
});
