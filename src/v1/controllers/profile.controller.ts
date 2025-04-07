import { User } from "@prisma/client";
import { Request, Response } from "express";
import prisma from "../config/db";
import { getUserById } from "../services/user.service";

export default async function profileController(req: Request, res: Response) {
  const user = await getUserById(req?.user?.id);
  if (user) {
    res.status(200).send(user);
    return;
  } else {
    res.status(404).send({ message: "user is not exist" });
    return;
  }
}
export async function editProfile(req: Request<{}, {}, User>, res: Response) {
  const updatedUser = await prisma.user.update({
    where: { id: req.body.id },
    data: req.body,
  });
}
