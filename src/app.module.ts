import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { DatabaseModule } from "./dataAccess/database.module";
import { AuthModule } from "./api/auth/auth.module";
import { ConfigsModule } from "./config/config.module";
import { FileStorageModule } from "./api/file-storage/file-storage.module";
import { I18nCustomModule } from "./i18n/I18nCustom.module";

@Module({
  imports: [
    ConfigsModule,
    DatabaseModule,
    AuthModule,
    FileStorageModule,
    I18nCustomModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
