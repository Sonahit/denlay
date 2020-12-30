import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class JwtBlacklist {
  @PrimaryColumn()
  jwt!: string;
}
