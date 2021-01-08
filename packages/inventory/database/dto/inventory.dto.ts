import { Inventory } from '../interfaces/Inventory';
import { InventoryItemDto } from './inventory-item.dto';

export class InventoryDto implements Inventory {
  id!: number;

  userId!: number;

  cells!: number;

  items!: InventoryItemDto[];
}
