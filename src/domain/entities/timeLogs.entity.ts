import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Users } from "./users.entity";
import { Todos } from "./todo.entity";

@Entity()
export class TimeLogs extends customBaseEntity<string>("uuid") {
  @Column({ type: "uuid", nullable: true })
  userId: string | null;

  @ManyToOne(() => Users, (Users) => Users.timeLogs, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column({ type: "uuid", nullable: true })
  todoId?: string | null;

  @ManyToOne(() => Todos, (Todos) => Todos.timeLogs, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "todoId" })
  todo: Todos;

  @Column({ type: "varchar", length: 50 })
  title: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  description?: string | null;

  @Column({ type: "datetime" })
  startDate: Date;

  @Column({ type: "datetime", nullable: true })
  endDate?: Date | null;

  @Column({ type: "integer", default: 0, unsigned: true })
  duration: number;
}
