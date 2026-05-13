import { FileInterceptor } from "@nestjs/platform-express";
import { randomUUID } from "crypto";
import { diskStorage } from "multer";
import { extname } from "path";
import { validateUpload } from "src/utils/validateUpload";

export function SingleFileInterceptor() {
  return FileInterceptor("file", {
    limits: {
      fileSize: 500 * 1024 * 1024,
    },

    storage: diskStorage({
      destination: "./uploads",

      filename: (req, file, callback) => {
        const fileExtension = extname(file.originalname);

        const fileName = `${randomUUID()}${fileExtension}`;

        callback(null, fileName);
      },
    }),

    fileFilter: async (req, file, callback) => {
      try {
        await validateUpload(req, file);
        callback(null, true);
      } catch (error) {
        callback(error, false);
      }
    },
  });
}
