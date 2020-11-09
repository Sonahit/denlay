import { InventoryItemPostDto } from '@database/dto/inventory-item-post.dto';
import { PlaceItemDto } from '@database/dto/place-item.dto';
import { InventoryItem } from '@database/models/inventory-item.entity';
import { Inventory } from '@database/models/inventory.entity';
import { User } from '@database/models/user.entity';
import { getRepository } from '../internal/plugins/node_modules/typeorm';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@exceptions/BadRequestException';
import { DEFAULT_CELLS } from './constants';

export const getInventory = async (user: User): Promise<Inventory> => {
  const invRep = getRepository(Inventory);

  const inv = await invRep.findOne({ where: { userId: user.id } });

  if (!inv) {
    return await invRep.save({ userId: user.id, cells: DEFAULT_CELLS });
  }

  return inv;
};

export const createItem = async (inventory: Inventory, itemPostDto: InventoryItemPostDto): Promise<InventoryItem> => {
  const invItemRep = getRepository(InventoryItem);
  const itemPost = plainToClass(InventoryItemPostDto, itemPostDto);
  itemPost.inventoryId = inventory.id;

  return await invItemRep.save(itemPost);
};

export const createItems = async (
  inventory: Inventory,
  itemPostDtos: InventoryItemPostDto[]
): Promise<InventoryItem[]> => {
  return await Promise.all(itemPostDtos.map((i) => createItem(inventory, i)));
};

export const placeItem = async (inventory: Inventory, placeItemDto: PlaceItemDto): Promise<InventoryItem> => {
  const invItemRep = getRepository(InventoryItem);
  const { id, cell, count } = plainToClass(PlaceItemDto, placeItemDto);
  if (cell && cell > inventory.cells) {
    throw new BadRequestException('errors.inventory.max_cell');
  }
  const item = await invItemRep.findOne(id);

  if (!item) {
    throw new BadRequestException('errors.entity.doesnt_exists');
  }

  return await invItemRep.save(invItemRep.merge(item, { cell, count }));
};

export const deleteItem = async (item: InventoryItem): Promise<boolean> => {
  const invItemRep = getRepository(InventoryItem);
  try {
    await invItemRep.delete(item);
  } catch (e) {
    return false;
  }
  return true;
};
