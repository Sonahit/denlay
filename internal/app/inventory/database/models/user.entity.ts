import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { Inventory } from './inventory.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id!: number;

  @Column({
    unique: true,
  })
  @Expose()
  email!: string;

  @Column()
  @Expose()
  password!: string;

  @OneToOne(() => Inventory, (i) => i.user, {
    lazy: true,
  })
  inventory!: Promise<Inventory>;
}
