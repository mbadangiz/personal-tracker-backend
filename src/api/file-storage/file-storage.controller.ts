import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UploadedFiles,
} from "@nestjs/common";
import { ApiQuery } from "@nestjs/swagger";
import {
  MultiUploadDecorator,
  SingleUploadDecorator,
} from "src/decorators/fileStorage.decorators";

@Controller("file-storage")
export class FileStorageController {
  @Post("single-upload")
  @ApiQuery({
    name: "type",
  })
  @SingleUploadDecorator()
  async uploadFiles(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return {
      filename: file.filename,
      originalname: Buffer.from(file.originalname, "latin1").toString("utf8"),
      size: file.size,
      mimetype: file.mimetype,
      des: file.destination,
    };
  }

  @Post("multi-upload")
  @MultiUploadDecorator()
  async multiUploadFiles(
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    return {
      message: "Files uploaded successfully",
      files: files.map((file) => {
        return {
          filename: file.filename,
          originalname: Buffer.from(file.originalname, "latin1").toString(
            "utf8",
          ),
          size: file.size,
          mimetype: file.mimetype,
          des: file.destination,
        };
      }),
    };
  }
}
