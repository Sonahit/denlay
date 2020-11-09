import { InventoryItem } from '@database/interfaces/InventoryItem';
import { IsNumber, IsString } from 'class-validator';

export class InventoryItemDto implements InventoryItem {
  @IsNumber()
  id!: number;

  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  count!: number;

  @IsNumber()
  cell!: number;

  @IsNumber()
  inventoryId!: number;
}
