import { z } from "zod";
const ACCEPTED_IMAGE_MIME_TYPES: string[] = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const imageSchema = z
  .any()
  .refine(
    (file: Express.Multer.File) => {
      return ACCEPTED_IMAGE_MIME_TYPES.includes(file?.mimetype);
    },
    { message: "Only .jpg, .jpeg, .png and .webp formats are supported." }
  )
  .optional();
export default imageSchema;
