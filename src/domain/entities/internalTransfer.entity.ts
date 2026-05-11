import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { FinancialAccount } from "./financialAccount.entity";

@Entity()
export class InternalTransfer extends customBaseEntity<string>("uuid") {
  @Column({ type: "varchar", length: 255 })
  title: string;

  @Column({ type: "uuid" })
  fromAccountId: string;

  @ManyToOne(() => FinancialAccount, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "fromAccountId" })
  fromAccount: FinancialAccount;

  @Column({ type: "uuid" })
  toAccountId: string;

  @ManyToOne(() => FinancialAccount, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "toAccountId" })
  toAccount: FinancialAccount;

  @Column({ type: "bigint" })
  fromAmount: number;

  @Column({ type: "bigint" })
  toAmount: number;

  @Column({ type: "datetime" })
  date: Date;
}
