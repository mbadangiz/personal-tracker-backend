import {
  BadRequestException,
  INestApplication,
  ValidationPipe,
} from "@nestjs/common";

function validationErr(app: INestApplication<any>) {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
      validationError: {
        target: false,
        value: false,
      },
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors) => {
        const customErrors = errors.map((error) => ({
          field: error.property,
          errMessages: Object.values(error.constraints || {}),
        }));

        throw new BadRequestException({
          success: false,
          statusCode: 400,
          message: "Validation failed",
          errors: customErrors,
        });
      },
    }),
  );
}

export { validationErr };
