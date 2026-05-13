import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Projects } from "./project.entity";
import { TimeLogs } from "./timeLogs.entity";
import { TodoAttachments } from "./todoAttachments.entity";
import { TodoTags } from "./todoTags.entity";
import { Users } from "./users.entity";

export enum Priority {
  HIGH = "high",
  MID = "mid",
  LOW = "low",
}

export enum TodoStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

@Entity()
export class Todos extends customBaseEntity<string>("uuid") {
  @Column({
    nullable: true,
  })
  @Index()
  userId: string | null;

  @ManyToOne(() => Users, (Users) => Users.todos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: Users | null;

  @Column({
    nullable: true,
  })
  projectId: number | null;

  @ManyToOne(() => Projects, (Projects) => Projects.todos, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "projectId" })
  project: Projects | null;

  // Properties
  @Column({
    type: "varchar",
    length: 100,
  })
  name: string;

  @Column({
    type: "text",
  })
  description: string;

  @Column({
    type: "datetime",
    nullable: true,
  })
  complete_at?: Date | null;

  @Column({
    type: "varchar",
    length: 15,
    default: Priority.LOW,
  })
  priority: Priority;

  @Column({
    type: "varchar",
    length: 15,
    default: TodoStatus.PENDING,
  })
  status: TodoStatus;

  @OneToMany(() => TodoAttachments, (TodoAttachments) => TodoAttachments.todo)
  attachments: TodoAttachments[];

  @OneToMany(() => TodoTags, (TodoTags) => TodoTags.todo)
  tags: TodoTags[];

  @OneToMany(() => TimeLogs, (TimeLogs) => TimeLogs.todo)
  timeLogs: TimeLogs[];
}
