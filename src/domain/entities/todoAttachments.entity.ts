import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Todos } from "./todo.entity";
import { Storage } from "./storage.entity";

@Entity()
export class TodoAttachments extends customBaseEntity<string>("uuid") {
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

  @Column({
    type: "uuid",
  })
  storageId: string;
  @ManyToOne(() => Storage, (Storage) => Storage.todoAttachments, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "storageId" })
  storage: Storage;
}
