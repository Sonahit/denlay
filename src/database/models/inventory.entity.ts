import { BaseEntity } from '../../types';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryDto } from '@database/dto/inventory.dto';
import { User } from './user.entity';
import { InventoryItem } from './inventory-item.entity';

@Entity()
export class Inventory implements BaseEntity<InventoryDto> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  userId!: number;

  @Column({
    default: 30,
  })
  cells!: number;

  @OneToOne(() => User, (u) => u.inventory, {
    lazy: true,
  })
  @JoinColumn()
  user!: Promise<User>;

  @OneToMany(() => InventoryItem, (i) => i.inventory, {
    lazy: true,
  })
  items!: Promise<InventoryItem[]>;

  toDto() {
    return {};
  }
}
