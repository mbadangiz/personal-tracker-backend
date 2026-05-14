import { Column, Entity, Index, OneToMany } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { TodoTags } from "./todoTags.entity";
import { Notes } from "./notes.entity";
import { NotesTags } from "./notesTags.entity";

@Entity()
export class Tags extends customBaseEntity<number>("increment") {
  @Column({
    type: "varchar",
    length: 20,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 100,
    nullable: true,
  })
  description?: string;

  @Column({ type: "integer" })
  @Index()
  userId: number;

  @OneToMany(() => TodoTags, (TodoTags) => TodoTags.tag)
  todos: TodoTags[];

  @OneToMany(() => NotesTags, (NotesTags) => NotesTags.tag)
  notes: NotesTags[];
}
