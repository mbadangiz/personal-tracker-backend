import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import { Users } from "./users.entity";
import { Storage } from "./storage.entity";

@Entity()
export class Profile {
  @PrimaryColumn()
  userId: number;

  @OneToOne(() => Users, (Users) => Users.profile, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "userId" })
  user: Users;

  @Column({
    type: "varchar",
    length: 30,
    nullable: true,
  })
  firstName?: string;

  @Column({
    type: "varchar",
    length: 30,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: "varchar",
    length: 200,
    nullable: true,
  })
  bio?: string;

  @Column({ type: "uuid", nullable: true })
  avatarId: string;

  @OneToOne(() => Storage, (storage) => storage.profileAvatar, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "avatarId" })
  avatar: Storage;
}
