import { FastifyRoute } from '../../types';

const noop: FastifyRoute = (fastify) => {
  return fastify;
};

export const getInventory: FastifyRoute = noop;

export const createItem: FastifyRoute = noop;

export const putItem: FastifyRoute = noop;

export const deleteItem: FastifyRoute = noop;
