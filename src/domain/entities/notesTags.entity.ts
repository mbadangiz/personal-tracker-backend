import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Tags } from "./tag.entity";
import { Notes } from "./notes.entity";

@Entity()
@Index(["tagId", "noteId"], { unique: true })
export class NotesTags extends customBaseEntity<string>("uuid") {
  @Index()
  @Column({ type: "uuid" })
  noteId: string;

  @ManyToOne(() => Notes, (Notes) => Notes.tags, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "noteId" })
  note: Notes;

  @Index()
  @Column({ type: "integer" })
  tagId: number;

  @ManyToOne(() => Tags, (Tags) => Tags.notes, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "tagId" })
  tag: Tags;
}
