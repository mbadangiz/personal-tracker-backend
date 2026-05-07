import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { PrimaryGeneratedColumnNumericOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnNumericOptions.js";
import { PrimaryGeneratedColumnUUIDOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnUUIDOptions.js";
import { PrimaryGeneratedColumnIdentityOptions } from "typeorm/decorator/options/PrimaryGeneratedColumnIdentityOptions.js";

type Strategy = "increment" | "uuid" | "rowid" | "identity";

type Options =
  | PrimaryGeneratedColumnNumericOptions
  | PrimaryGeneratedColumnUUIDOptions
  | PrimaryGeneratedColumnIdentityOptions;

export function customBaseEntity<T>(strategy?: Strategy, option?: Options) {
  abstract class BaseEntity {
    @PrimaryGeneratedColumn(strategy as any, option as any)
    id: T;

    @CreateDateColumn({
      type: "datetime",
      default: () => "datetime('now','localtime')",
    })
    createdAt: Date;

    @UpdateDateColumn({
      type: "datetime",
      default: () => "datetime('now','localtime')",
    })
    updatedAt: Date;

    @Column({
      type: "boolean",
      default: false,
    })
    isDelete: boolean;
  }

  return BaseEntity;
}
