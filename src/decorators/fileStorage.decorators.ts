import { applyDecorators, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { MultiFileInterceptor } from "src/interceptors/multiFileInterceptor.interceptors";
import { SingleFileInterceptor } from "src/interceptors/singleFileInterceptor.interceptors";

export function SingleUploadDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: "Upload single file",
    }),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",

        properties: {
          file: {
            type: "string",
            format: "binary",
          },
        },
      },
    }),
    UseInterceptors(SingleFileInterceptor()),
  );
}

export function MultiUploadDecorator() {
  return applyDecorators(
    ApiOperation({
      summary: "Upload multiple files",
    }),
    ApiConsumes("multipart/form-data"),
    ApiBody({
      schema: {
        type: "object",
        properties: {
          files: {
            type: "array",
            items: {
              type: "string",
              format: "binary",
            },
          },
        },
      },
    }),
    UseInterceptors(MultiFileInterceptor()),
  );
}
