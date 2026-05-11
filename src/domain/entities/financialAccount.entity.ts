import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Currency } from "./currency.entity";
import { Transactions } from "./transaction.entity";
import { Users } from "./users.entity";
import { InternalTransfer } from "./internalTransfer.entity";

export enum FinancialAccountType {
  Card = "card",
  BankAccount = "bank_account",
  Wallet = "wallet",
  Crypto = "crypto",
  Cash = "cash",
}

@Entity()
export class FinancialAccount extends customBaseEntity<string>("uuid") {
  @Column({ type: "integer" })
  userId: number;

  @ManyToOne(() => Users, (User) => User.financialAccounts, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column({ type: "varchar", length: 60 })
  title: string;

  @Column({ type: "varchar", length: 12 })
  type: FinancialAccountType;

  @Column({ type: "integer" })
  initialBalance: number;

  @Column({ type: "integer", nullable: true })
  currencyId?: number;

  @ManyToOne(() => Currency, (Currency) => Currency.accounts, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "currencyId" })
  currency: Currency;

  @Column({ type: "integer" })
  currentBalance: number;

  @Column({ type: "boolean", default: false })
  isArchived: boolean;

  @OneToMany(() => Transactions, (Transactions) => Transactions.account)
  transaction: Transactions[];

  @OneToMany(() => InternalTransfer, (t) => t.fromAccount)
  outgoingTransfers: InternalTransfer[];

  @OneToMany(() => InternalTransfer, (t) => t.toAccount)
  incomingTransfers: InternalTransfer[];
}
