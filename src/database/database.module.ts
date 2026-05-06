import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "sqljs",
      autoSave: true,
      location: "database.sqlite",
      entities: [join(__dirname, "..", "**", "*.entity{.ts,.js}")],
      synchronize: true,
      useLocalForage: false,
    }),
  ],
})
export class DatabaseModule {}
