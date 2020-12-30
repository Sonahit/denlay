import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Expose } from 'class-transformer';

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
}
