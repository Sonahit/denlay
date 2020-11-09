import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from '../internal/services/inventory/node_modules/typeorm';
import { Expose } from '../internal/services/inventory/routes/inventory/node_modules/class-transformer';
import { BaseEntity } from '../../types';
import { UserDto } from '../dto/user.dto';
import { Inventory } from './inventory.entity';

@Entity()
export class User implements BaseEntity<UserDto> {
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

  toDto() {
    return {
      email: this.email,
    };
  }
}
