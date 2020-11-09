import { Inventory } from '../interfaces/Inventory';

export class InventoryDto implements Inventory {
  id!: number;

  userId!: number;

  cells!: number;
}
