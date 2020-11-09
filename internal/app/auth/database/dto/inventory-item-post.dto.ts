import { InventoryItem } from '@database/interfaces/InventoryItem';
import { IsNumber, IsString, IsOptional } from 'class-validator';

export class InventoryItemPostDto implements InventoryItem {
  @IsString()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  count!: number;

  @IsNumber()
  cell!: number;

  @IsNumber()
  @IsOptional()
  inventoryId?: number;
}
