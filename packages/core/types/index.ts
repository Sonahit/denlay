import { FastifyInstance } from 'fastify';

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

export interface Type<T> extends Function {
  new (...args: any[]): T;
}
