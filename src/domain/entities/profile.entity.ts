import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";
import { Users } from "./users.entity";
import { Storage } from "./storage.entity";
import { Locations } from "./location.entity";
import { ProfileSocials } from "./profileSocials.entity";

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
  avatarId?: string;

  @OneToOne(() => Storage, (storage) => storage.profileAvatar, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "avatarId" })
  avatar: Storage;

  @Column({
    type: "date",
    nullable: true,
  })
  birthDate?: Date;

  @Column({
    type: "varchar",
    nullable: true,
  })
  gender: "male" | "female";

  @ManyToOne(() => Locations, (location) => location.profilesCountry, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "countryId" })
  country: Locations;

  @Column({ type: "integer", nullable: true })
  countryId?: number;

  @ManyToOne(() => Locations, (location) => location.profilesProvince, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "provinceId" })
  province: Locations;

  @Column({ type: "integer", nullable: true })
  provinceId?: number;

  @ManyToOne(() => Locations, (location) => location.profilesCity, {
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "cityId" })
  city: Locations;

  @Column({ type: "integer", nullable: true })
  cityId?: number;

  @OneToMany(() => ProfileSocials, (ProfileSocials) => ProfileSocials.profile)
  socials: ProfileSocials[];
}
