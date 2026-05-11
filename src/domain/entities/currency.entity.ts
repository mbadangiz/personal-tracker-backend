import { Column, Entity, Index, OneToMany } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { FinancialAccount } from "./financialAccount.entity";

@Entity()
export class Currency extends customBaseEntity<number>("increment") {
  @Index()
  @Column({ unique: true })
  name: string;

  @Column({ type: "integer" })
  toRialValue: number;

  @Column({ type: "integer" })
  toDollarValue: number;

  @OneToMany(
    () => FinancialAccount,
    (FinancialAccount) => FinancialAccount.currency,
  )
  accounts: FinancialAccount[];
}
