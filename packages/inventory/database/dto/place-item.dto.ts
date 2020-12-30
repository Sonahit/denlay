import { InventoryItem } from '../interfaces/InventoryItem';
import { IsNumber, IsOptional } from 'class-validator';

export class PlaceItemDto implements Partial<InventoryItem> {
  @IsNumber()
  id!: number;

  @IsNumber()
  @IsOptional()
  count?: number;

  @IsNumber()
  @IsOptional()
  cell?: number;
}
