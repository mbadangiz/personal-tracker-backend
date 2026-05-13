import { BadRequestException } from "@nestjs/common";
import { I18nContext } from "nestjs-i18n";
import { extname } from "path";
import { Request } from "express";

import {
  TUploadTypes,
  UploadPolicies,
} from "src/application/policy/upload.policy";

interface UploadRequest extends Request {
  query: {
    type?: TUploadTypes;
  };
}

interface MulterFilterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
}

export async function validateUpload(
  req: UploadRequest,
  file: MulterFilterFile,
): Promise<void> {
  const i18n = I18nContext.current();

  const lang = i18n?.lang;

  const type = req.query.type || "general";

  const policy = UploadPolicies[type];

  if (!policy) {
    throw new BadRequestException({
      data: "",
      message: await i18n?.t("upload.uploadTypeNotFound", {
        lang,
      }),
      statusCode: 400,
      success: false,
    });
  }

  const fileExtension = extname(file.originalname).toLowerCase();

  if (!policy.allowedExtensions.includes(fileExtension)) {
    throw new BadRequestException({
      data: "",
      message: await i18n?.t("upload.invalidFileType", {
        lang,
        args: {
          formats: policy.allowedExtensions.join(", "),
        },
      }),
      statusCode: 400,
      success: false,
    });
  }
}
