import { FastifySchema } from 'fastify';
import { JSONSchema7 } from 'json-schema';

export const definitions = [
  {
    $id: 'Inv',
    type: 'object',
    properties: {
      id: { type: 'number' },
      userId: { type: 'number' },
      cells: { type: 'number' },
      items: { type: 'array', items: { $ref: 'InvItem#' } },
    },
  } as JSONSchema7,
  {
    $id: 'InvItem',
    type: 'object',
    required: ['name'],
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      description: { type: 'string' },
      count: { type: 'number' },
      cell: { type: 'number' },
      inventoryId: { type: 'number' },
    },
  } as JSONSchema7,
];

export const getInventorySchema: FastifySchema = {
  summary: 'Получить инвентарь юзера',
  response: {
    '2xx': {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          $ref: 'Inv#',
        },
      },
    } as JSONSchema7,
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
      $ref: 'InvItem#',
    },
  } as JSONSchema7,
  response: {
    '2xx': {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            $ref: 'InvItem#',
          },
        },
      },
    } as JSONSchema7,
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
        oneOf: [
          {
            type: 'object',
            properties: {
              data: {
                type: 'object',
                $ref: 'InvItem#',
              },
            },
          },
          {
            type: 'object',
            properties: {
              data: {
                type: 'array',
                items: {
                  type: 'object',
                  $ref: 'InvItem#',
                },
              },
            },
          },
        ],
      },
    } as JSONSchema7,
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
