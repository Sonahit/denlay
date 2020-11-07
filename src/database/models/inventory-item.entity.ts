import { BaseEntity } from '../../types';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { InventoryItemDto } from '@database/dto/inventory-item.dto';
import { Inventory } from './inventory.entity';

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

  toDto() {
    return {};
  }
}
