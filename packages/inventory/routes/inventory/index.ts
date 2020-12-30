import { getRepository } from 'typeorm';
import { FastifyInstance } from 'fastify';
import { UnauthorizedException } from '@denlay/core/exceptions/UnauthorizedException';
import { MessageResponse } from '@denlay/core/types/index';
import { InventoryDto } from '../../database/dto/inventory.dto';
import { InventoryItemPostDto } from '../../database/dto/inventory-item-post.dto';
import { PlaceItemDto } from '../../database/dto/place-item.dto';
import { InventoryItemDto } from '../../database/dto/inventory-item.dto';
import { InventoryItem } from '../../database/models/inventory-item.entity';
import { BadRequestException } from '@denlay/core/exceptions/BadRequestException';
import { createItems, deleteItem, getInventory, placeItem } from './service';
import { createItemsSchema, deleteItemSchema, getInventorySchema, placeItemSchema } from './schemas';

export default (fastify: FastifyInstance) => {
  return fastify
    .get(
      '/inventory',
      {
        schema: getInventorySchema,
        preValidation: [(fastify as any).authenticate],
      },
      async (req): Promise<InventoryDto> => {
        if (req.user) {
          return await (await getInventory(req.user)).toDto();
        }
        throw new UnauthorizedException();
      }
    )
    .post(
      '/inventory',
      {
        schema: createItemsSchema,
        preValidation: [(fastify as any).authenticate],
      },
      async (req): Promise<InventoryItemDto[]> => {
        const body = req.body as InventoryItemPostDto[];
        if (req.user) {
          const inventory = await getInventory(req.user);
          return (await createItems(inventory, body)).map((i) => i.toDto());
        }
        throw new UnauthorizedException();
      }
    )
    .post(
      '/inventory/:itemId',
      {
        schema: placeItemSchema,
        preValidation: [(fastify as any).authenticate],
      },
      async (req): Promise<InventoryItemDto | InventoryItemDto[]> => {
        const body = {
          ...(req.body as Record<string, any>),
          id: (req.params as Record<string, any>).itemId as number,
        } as PlaceItemDto;
        if (req.user) {
          const inventory = await getInventory(req.user);
          const result = await placeItem(inventory, body);
          return Array.isArray(result) ? result.map((r) => r.toDto()) : result.toDto();
        }
        throw new UnauthorizedException();
      }
    )
    .delete(
      '/inventory/:itemId',
      {
        schema: deleteItemSchema,
        preValidation: [(fastify as any).authenticate],
      },
      async (req): Promise<MessageResponse> => {
        if (req.user) {
          const itemId = (req.params as { itemId: number }).itemId;
          try {
            await deleteItem(await getRepository(InventoryItem).findOneOrFail(itemId));
            return {
              message: 'messages.ok',
            };
          } catch (e) {
            throw new BadRequestException();
          }
        }
        throw new UnauthorizedException();
      }
    );
};
