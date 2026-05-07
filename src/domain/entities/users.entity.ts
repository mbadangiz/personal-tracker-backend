import { customBaseEntity } from "src/domain/abstracts/base.entity";
import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import { Profile } from "./profile.entity";

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
}
