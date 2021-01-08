import { BaseEntity } from '@denlay/core/types';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { InventoryItem } from './inventory-item.entity';
import { InventoryDto } from '../dto/inventory.dto';

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

  @OneToOne(() => User, {
    lazy: true,
    persistence: false,
  })
  @JoinColumn()
  user!: Promise<User>;

  @OneToMany(() => InventoryItem, (i) => i.inventory, {
    lazy: true,
  })
  items!: Promise<InventoryItem[]>;

  async toDto(): Promise<InventoryDto> {
    const items = await this.items;
    return {
      id: this.id,
      cells: this.cells,
      userId: this.userId,
      items: items.length ? await Promise.all(items.map((i) => i.toDto())) : [],
    };
  }
}
