export interface InventoryItem {
  id?: number;

  name: string;

  description: string;

  count: number;

  cell: number;

  inventoryId?: number;
}
