import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";
import { Profile } from "./profile.entity";

export enum LocationType {
  COUNTRY = "country",
  PROVINCE = "province",
  CITY = "city",
  NEIGHBORHOOD = "neighborhood",
}

@Entity()
export class Locations extends customBaseEntity<number>("increment") {
  @Column({
    type: "varchar",
    length: 150,
  })
  name: string;

  @ManyToOne(() => Locations, (location) => location.children, {
    nullable: true,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "parentId" })
  parent?: Locations;

  @Column({
    type: "integer",
    nullable: true,
  })
  parentId?: number;

  @OneToMany(() => Locations, (location) => location.parent)
  children?: Locations[];

  @Column({
    type: "enum",
    enum: LocationType,
  })
  type: LocationType;

  @OneToMany(() => Profile, (profile) => profile.country)
  profilesCountry: Profile[];

  @OneToMany(() => Profile, (profile) => profile.province)
  profilesProvince: Profile[];

  @OneToMany(() => Profile, (profile) => profile.city)
  profilesCity: Profile[];
}
