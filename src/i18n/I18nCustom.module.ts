import { Module } from "@nestjs/common";
import {
  I18nModule,
  QueryResolver,
  HeaderResolver,
  AcceptLanguageResolver,
} from "nestjs-i18n";
import { join } from "path";

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: "fa",
      loaderOptions: {
        path: join(process.cwd(), "src/i18n"),
        watch: true,
      },

      resolvers: [
        { use: QueryResolver, options: ["lang"] },
        new HeaderResolver(["lang"]),
        AcceptLanguageResolver,
      ],
    }),
  ],
})
export class I18nCustomModule {}
