import { BaseEntity } from '../../types';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from '../internal/services/inventory/node_modules/typeorm';
import { InventoryItemDto } from '@database/dto/inventory-item.dto';
import { Inventory } from './inventory.entity';

@Unique('inventory_name_unique_key', ['inventoryId', 'name'])
@Entity()
export class InventoryItem implements BaseEntity<InventoryItemDto> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column({
    default: 1,
  })
  count!: number;

  @Column()
  cell!: number;

  @Column()
  inventoryId!: number;

  @ManyToOne(() => Inventory, (i) => i.items, {
    lazy: true,
  })
  inventory!: Promise<Inventory>;

  toDto(): InventoryItemDto {
    return {
      id: this.id,
      name: this.name,
      inventoryId: this.inventoryId,
      cell: this.cell,
      count: this.count,
      description: this.description,
    };
  }
}
