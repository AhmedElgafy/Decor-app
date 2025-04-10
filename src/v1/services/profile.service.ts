import { User } from "@prisma/client";
import prisma from "../config/db";
import { uploadFile, deleteFile } from "./cloudinary.service";
import { Request } from "express";

async function updateProfile(req: Request<{}, {}, User>) {
  let oldImage: string | null = null;
  let newImage: string | null = null;
  if (req.file) {
    newImage = await uploadFile(req.file);
    oldImage = req.user?.image || null;
  }
  if (newImage && oldImage && oldImage != process.env.DEFAULT_USER_IMAGE) {
    await deleteFile(oldImage);
  }
  const newUser:any = await prisma.user.update({
    where: { id: req?.user?.id },
    data: { ...req.body, ...(newImage && { image: newImage }) },
  });
  delete newUser.password
  return newUser;
}
const profile={
    updateProfile
}
export default profile