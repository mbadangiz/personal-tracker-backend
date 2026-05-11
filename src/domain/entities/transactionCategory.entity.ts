import { Column, Entity, Index, OneToMany } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Transactions } from "./transaction.entity";

@Entity()
export class TransactionCategory extends customBaseEntity<number>("increment") {
  @Index()
  @Column({ type: "varchar", length: 40, unique: true })
  name: string;

  @OneToMany(() => Transactions, (Transactions) => Transactions.category)
  transactions: Transactions[];
}
