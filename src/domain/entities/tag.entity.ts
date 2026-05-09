import { Column, Entity, OneToMany } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { TodoTags } from "./todoTags.entity";

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

  @OneToMany(() => TodoTags, (TodoTags) => TodoTags.tag)
  todos: TodoTags[];
}
