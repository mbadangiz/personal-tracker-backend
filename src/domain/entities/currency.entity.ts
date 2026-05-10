import { Column, Entity, Index } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";

@Entity()
export class Currency extends customBaseEntity<number>("increment") {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column({ type: "integer" })
  toRialValue: number;

  @Column({ type: "integer" })
  toDollarValue: number;
}
