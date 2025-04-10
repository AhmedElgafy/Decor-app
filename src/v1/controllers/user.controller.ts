import { NextFunction, Request, Response } from "express";
import { UpdateUserSchema } from "../schemas/user.schema";
import { Prisma, User } from "@prisma/client";
import UserService from "../services/user.service";

async function getUser(req: Request, res: Response) {
  const user = await UserService.getUserById(Number(req.params.id));
  if (!user) {
    res.status(404).send({ message: "This user is not exist" });
    return;
  } else {
    res.status(200).send(user);
    return;
  }
}
async function updateUser(
  req: Request<{ id: string }, {}, User>,
  res: Response,
  next: NextFunction
) {
  try {
    UpdateUserSchema.parse(req.body);
    const newUser = await UserService.updateUser(req);
    res.status(200).send({ message: "User is updated successfully", newUser });
    return;
  } catch (err) {
    next(err);
  }
}
async function deleteUser(req: Request, res: Response, next: NextFunction) {
  try {
    const id: number = Number(req.params.id);
    const user = await UserService.deleteUser(id);
    if (!user) {
      res.status(404).send({ message: "User is is not found" });
      return;
    } else {
      res.status(204).send({ message: "User is deleted successfully" });
      return;
    }
  } catch (err) {
    next(err);
  }
}
const UserController = {
  updateUser,
  getUser,
  deleteUser,
};
export default UserController;
