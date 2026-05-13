import { BadRequestException } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { randomUUID } from "crypto";
import { I18nContext } from "nestjs-i18n";

import {
  TUploadTypes,
  UploadPolicies,
} from "src/application/policy/upload.policy";

import { generalResponse } from "src/domain/abstracts/interfaces";
import { validateUpload } from "src/utils/validateUpload";

export function MultiFileInterceptor() {
  return FilesInterceptor("files", 20, {
    limits: {
      fileSize: 5000 * 1024 * 1024,
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
