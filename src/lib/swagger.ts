import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

function swagger(app: INestApplication<any>) {
  const config = new DocumentBuilder()
    .setTitle("Personal Tracker API")
    .setDescription("The Personal Tracker API description")
    .setVersion("1.0")
    .addBearerAuth()

    .addGlobalParameters({
      in: "header",
      required: false,
      name: "accept-language",
      schema: {
        type: "string",
        default: "fa",
        enum: ["fa", "en"],
      },
      description: "Application language",
    })

    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup("docs", app, documentFactory, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
}

export { swagger };
