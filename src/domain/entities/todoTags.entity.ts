import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Tags } from "./tag.entity";
import { Todos } from "./todo.entity";

@Entity()
@Index(["tagId", "todoId"], { unique: true })
export class TodoTags extends customBaseEntity<string>("uuid") {
  @Index()
  @Column({ type: "integer" })
  tagId: number;

  @ManyToOne(() => Tags, (Tags) => Tags.todos, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "tagId" })
  tag: Tags;

  @Index()
  @Column({
    type: "uuid",
  })
  todoId: string;

  @ManyToOne(() => Todos, (todo) => todo.attachments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "todoId" })
  todo: Todos;
}
