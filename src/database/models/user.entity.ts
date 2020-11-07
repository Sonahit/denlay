import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../types';
import { UserDto } from '../dto/user.dto';
import { Inventory } from './inventory.entity';

@Entity()
export class User implements BaseEntity<UserDto> {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    unique: true,
  })
  email!: string;

  @Column()
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
