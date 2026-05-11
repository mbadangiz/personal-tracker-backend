import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { FinancialAccount } from "./financialAccount.entity";
import { TransactionCategory } from "./transactionCategory.entity";
import { Storage } from "./storage.entity";

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

@Entity()
export class Transactions extends customBaseEntity<string>("uuid") {
  @Column({ type: "integer", nullable: true })
  accountId?: number;

  @ManyToOne(
    () => FinancialAccount,
    (FinancialAccount) => FinancialAccount.transaction,
    { onDelete: "SET NULL", onUpdate: "CASCADE" },
  )
  @JoinColumn({ name: "accountId" })
  account: FinancialAccount;

  @Column({ type: "varchar", length: 20 })
  type: TransactionType;

  @Column({ type: "integer" })
  amount: number;

  @Column({ type: "integer", nullable: true })
  categoryId?: number;

  @ManyToOne(
    () => TransactionCategory,
    (TransactionCategory) => TransactionCategory.transactions,
    { onDelete: "SET NULL", onUpdate: "CASCADE" },
  )
  @JoinColumn({ name: "categoryId" })
  category?: TransactionCategory | null;

  @Column({ type: "varchar", length: 200 })
  description: string;

  @Column({ type: "uuid", nullable: true })
  attachmentId?: string;

  @ManyToOne(() => Storage, (Storage) => Storage.transactions, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "attachmentId" })
  storage: Storage | null;

  @Column({ type: "datetime" })
  date: Date;

  @Column({ type: "text", nullable: true })
  meta?: string;
}
