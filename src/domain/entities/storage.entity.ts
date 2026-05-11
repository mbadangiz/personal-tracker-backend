import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Profile } from "./profile.entity";
import { TodoAttachments } from "./todoAttachments.entity";
import { Transactions } from "./transaction.entity";

export enum StorageType {
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  DOCUMENT = "document",
  ARCHIVE = "archive",
  CODE = "code",
  FONT = "font",
  OTHER = "other",
}

@Entity()
export class Storage extends customBaseEntity<string>("uuid") {
  @Column({
    length: 150,
    unique: true,
  })
  name: string;

  @Column()
  originalName: string;

  @Column({
    type: "varchar",
    length: 200,
  })
  description: string;

  @Column({
    type: "varchar",
    length: 20,
  })
  type: StorageType;

  @Column({
    length: 10,
  })
  extension: string;

  @Column({ type: "integer" })
  size: bigint;

  @Column()
  path: string;

  @OneToOne(() => Profile, (profile) => profile.avatar)
  profileAvatar: Profile;

  //
  @OneToMany(
    () => TodoAttachments,
    (TodoAttachments) => TodoAttachments.storage,
  )
  todoAttachments: TodoAttachments[];

  @OneToMany(() => Transactions, (Transactions) => Transactions.storage)
  transactions: Transactions[];
}
