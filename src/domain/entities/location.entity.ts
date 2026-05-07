import { Entity } from "typeorm";
import { customBaseEntity } from "../abstracts/base.entity";

@Entity()
export class Locations extends customBaseEntity<number>("increment") {}
