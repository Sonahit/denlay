import { Entity, PrimaryColumn } from '../internal/services/inventory/node_modules/typeorm';

@Entity()
export class JwtBlacklist {
  @PrimaryColumn()
  jwt!: string;
}
