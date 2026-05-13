export type UploadPolicy = {
  allowedExtensions: string[];
  maxSize: number;
  maxCount: number;
};

export enum EUploadType {
  AVATAR = "avatar",
  ATTACHMENT = "attachment",
  VIDEO = "video",
  GENERAL = "general",
}

export type TUploadTypes = `${EUploadType}`;

export const UploadPolicies: Record<TUploadTypes, UploadPolicy> = {
  [EUploadType.AVATAR]: {
    allowedExtensions: [".jpg", ".jpeg", ".png", ".webp"],

    maxSize: 1 * 1024 * 1024, // 1MB

    maxCount: 1,
  },

  [EUploadType.ATTACHMENT]: {
    allowedExtensions: [
      ".pdf",
      ".doc",
      ".docx",
      ".jpg",
      ".jpeg",
      ".png",
      ".xlsx",
      ".xls",
      ".txt",
      ".zip",
    ],

    maxSize: 50 * 1024 * 1024, // 50MB

    maxCount: 5,
  },

  [EUploadType.VIDEO]: {
    allowedExtensions: [".mp4", ".mov", ".avi", ".mkv", ".webm"],

    maxSize: 500 * 1024 * 1024, // 500MB

    maxCount: 1,
  },

  [EUploadType.GENERAL]: {
    allowedExtensions: [".jpg", ".jpeg", ".png", ".pdf", ".mp4", ".mp3"],

    maxCount: 5,

    maxSize: 20 * 1024 * 1024, // 20MB
  },
};
