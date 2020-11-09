import { FastifyRoute } from '~pkg/types';
import { createItemsSchema, deleteItemSchema, getInventorySchema, placeItemSchema } from './schemas';

export const getInventory: FastifyRoute = (fastify) =>
  fastify.get(
    '/inventory',
    {
      schema: getInventorySchema,
      preValidation: [(fastify as any).authenticate],
    },
    async (req, res) => {
      res.send('');
    }
  );

export const createItems: FastifyRoute = (fastify) =>
  fastify.post(
    '/inventory',
    {
      schema: createItemsSchema,
      preValidation: [(fastify as any).authenticate],
    },
    async (req, res) => {
      res.send('');
    }
  );

export const placeItem: FastifyRoute = (fastify) =>
  fastify.post(
    '/inventory/:itemId',
    {
      schema: placeItemSchema,
      preValidation: [(fastify as any).authenticate],
    },
    async (req, res) => {
      res.send('');
    }
  );

export const deleteItem: FastifyRoute = (fastify) =>
  fastify.delete(
    '/inventory/:itemId',
    {
      schema: deleteItemSchema,
      preValidation: [(fastify as any).authenticate],
    },
    async (req, res) => {
      res.send('');
    }
  );

export default [getInventory, createItems, placeItem, deleteItem];
