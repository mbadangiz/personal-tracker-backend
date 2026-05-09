import { Column, Entity, OneToMany } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Todos } from "./todo.entity";

@Entity()
export class Projects extends customBaseEntity<number>("increment") {
  @Column({
    type: "varchar",
    length: 50,
  })
  name: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  employer: string;

  @Column({
    type: "varchar",
    length: 50,
  })
  company: string;

  @OneToMany(() => Todos, (Todos) => Todos.project)
  todos: Todos[];
}
