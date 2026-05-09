import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Users } from "./users.entity";
import { NotesTags } from "./notesTags.entity";

@Entity()
export class Notes extends customBaseEntity<string>("uuid") {
  @Column({ type: "integer" })
  userId: number;

  @ManyToOne(() => Users, (user) => user.note, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text" })
  metaData: string;

  @OneToMany(() => NotesTags, (notesTags) => notesTags.note)
  tags: NotesTags[];
}
