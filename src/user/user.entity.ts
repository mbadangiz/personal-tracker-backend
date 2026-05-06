import { customBaseEntity } from "src/database/base.entity";
import { Column, Entity } from "typeorm";

@Entity()
export class User extends customBaseEntity("uuid") {
  @Column({
    unique: true,
  })
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
