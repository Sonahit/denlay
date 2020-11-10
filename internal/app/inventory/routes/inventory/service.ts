import { InventoryItemPostDto } from '../../database/dto/inventory-item-post.dto';
import { PlaceItemDto } from '../../database/dto/place-item.dto';
import { InventoryItem } from '../../database/models/inventory-item.entity';
import { Inventory } from '../../database/models/inventory.entity';
import { User } from '../../database/models/user.entity';
import { getRepository } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '~pkg/exceptions/BadRequestException';
import { DEFAULT_CELLS } from './constants';

export const getInventory = async (user: User): Promise<Inventory> => {
  const invRep = getRepository(Inventory);

  const inv = await invRep.findOne({ where: { userId: user.id } });

  if (!inv) {
    const newInv = await invRep.save({ userId: user.id, cells: DEFAULT_CELLS });
    return newInv;
  }

  return inv;
};

export const createItem = async (inventory: Inventory, itemPostDto: InventoryItemPostDto): Promise<InventoryItem> => {
  const invItemRep = getRepository(InventoryItem);
  const itemPost = plainToClass(InventoryItemPostDto, itemPostDto);
  const oldItem = await invItemRep.findOne({ where: { cell: itemPost.cell, inventoryId: inventory.id } });
  if (oldItem) {
    await invItemRep.delete(oldItem);
  }

  itemPost.inventoryId = inventory.id;

  return invItemRep.create(await invItemRep.save(itemPost));
};

export const createItems = async (
  inventory: Inventory,
  itemPostDtos: InventoryItemPostDto[]
): Promise<InventoryItem[]> => {
  return await Promise.all(itemPostDtos.map((i) => createItem(inventory, i)));
};

export const placeItem = async (
  inventory: Inventory,
  placeItemDto: PlaceItemDto
): Promise<InventoryItem | InventoryItem[]> => {
  const invItemRep = getRepository(InventoryItem);
  const { id, cell, count } = plainToClass(PlaceItemDto, placeItemDto);
  if (cell && cell > inventory.cells) {
    throw new BadRequestException('errors.inventory.max_cell');
  }
  const item = await invItemRep.findOne(id);
  const inCellItem = await invItemRep.findOne({ where: { cell, inventoryId: inventory.id } });

  if (!item) {
    throw new BadRequestException('errors.entity.doesnt_exists');
  }
  if (inCellItem && item.name === inCellItem.name) {
    inCellItem.count += item.count;
    await invItemRep.delete(item.id);
    return await invItemRep.save(inCellItem);
  } else if (inCellItem && item.name !== inCellItem.name) {
    const temp = inCellItem.cell;
    inCellItem.cell = item.cell;
    item.cell = -1;

    await invItemRep.save(item);

    const newInCellItem = await invItemRep.save(inCellItem);

    item.cell = temp;
    const newItem = await invItemRep.save(item);

    return [newInCellItem, newItem];
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
