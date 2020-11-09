import { BaseEntity } from '~pkg/types';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { InventoryDto } from '../dto/inventory.dto';
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
      invItems: items.length ? items.map((i) => i.toDto()) : [],
    };
  }
}
