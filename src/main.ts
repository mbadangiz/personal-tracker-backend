import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { swagger } from "./lib/swagger";
import { validationErr } from "./lib/validationErr";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swagger(app);
  validationErr(app);

  app.enableCors({
    origin: "*",
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
