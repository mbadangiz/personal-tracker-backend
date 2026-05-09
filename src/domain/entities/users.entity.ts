import { customBaseEntity } from "src/domain/abstracts/base.entity";
import { Column, Entity, OneToMany, OneToOne } from "typeorm";
import { Profile } from "./profile.entity";
import { TimeLogs } from "./timeLogs.entity";
import { Todos } from "./todo.entity";

@Entity()
export class Users extends customBaseEntity<number>() {
  @Column({
    unique: true,
    length: 30,
  })
  username: string;

  @Column({
    unique: true,
    length: 30,
  })
  email: string;

  @Column()
  hashedPassword: string;

  @Column({
    unique: true,
    length: 11,
  })
  phoneNumber: string;

  @OneToOne(() => Profile, (Profile) => Profile.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  profile: Profile;

  @OneToMany(() => Todos, (Todos) => Todos.user)
  todos: Todos[];

  @OneToMany(() => TimeLogs, (TimeLogs) => TimeLogs.user)
  timeLogs: TimeLogs[];
}
