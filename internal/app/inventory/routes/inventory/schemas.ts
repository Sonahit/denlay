import { FastifySchema } from '../internal/plugins/node_modules/fastify';

export const getInventorySchema: FastifySchema = {
  summary: 'Получить инвентарь юзера',
  response: {
    '2xx': {
      type: 'object',
      properties: {
        data: {
          $ref: '#/definitions/Inv',
        },
      },
    },
  },
  security: [
    {
      apiKey: [],
    },
  ],
};

export const createItemsSchema: FastifySchema = {
  summary: 'Создать вещи',
  body: {
    type: 'array',
    items: {
      $ref: '#/definitions/InvItem',
    },
  },
  response: {
    '2xx': {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            $ref: '#/definitions/InvItem',
          },
        },
      },
    },
  },
  security: [
    {
      apiKey: [],
    },
  ],
};

export const placeItemSchema: FastifySchema = {
  summary: 'Переместить вещи',
  body: {
    type: 'object',
    properties: {
      cell: { type: 'number' },
    },
  },
  response: {
    '2xx': {
      type: 'object',
      properties: {
        data: {
          $ref: '#/definitions/InvItem',
        },
      },
    },
  },
  params: {
    type: 'object',
    properties: {
      itemId: {
        type: 'number',
      },
    },
  },
  security: [
    {
      apiKey: [],
    },
  ],
};

export const deleteItemSchema: FastifySchema = {
  summary: 'Удалить вещь',
  params: {
    type: 'object',
    properties: {
      itemId: {
        type: 'number',
      },
    },
  },
  security: [
    {
      apiKey: [],
    },
  ],
};
