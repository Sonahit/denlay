import { FastifyInstance } from '../internal/plugins/node_modules/fastify';

export type NextFn = (err?: Error) => void;

export type TFastifyPlugin<T = any> = (fastify: FastifyInstance, opts: T, next: NextFn) => void;

export type BaseEntity<Dto> = {
  toDto(): Promise<Dto> | Dto;
};
export interface MessageResponse {
  message: string;
}

export interface JWTResponse {
  data: { jwt: string };
}

export type FastifyRoute = (fastify: FastifyInstance) => FastifyInstance;
