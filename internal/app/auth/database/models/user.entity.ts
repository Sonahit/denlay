import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';
import { BaseEntity } from '../../../../pkg/types';
import { UserDto } from '~pkg/dto/user.dto';

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

  toDto(): UserDto {
    return {
      id: this.id,
      email: this.email,
    };
  }
}
