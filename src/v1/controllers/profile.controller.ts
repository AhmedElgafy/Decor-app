import { UpdateUserSchema } from "./../schemas/user.schema";
import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

import { createUserToken } from "../utils/auth";
import UserService from "../services/user.service";
import ProfileService from "../services/profile.service";

async function getProfile(req: Request, res: Response) {
  const user = await UserService.getUserById(req?.user?.id);
  if (user) {
    res.status(200).send(user);
    return;
  } else {
    res.status(404).send({ message: "user is not exist" });
    return;
  }
}

async function updateProfile(
  req: Request<{},{},User>,
  res: Response,
  next: NextFunction
) {
  try {
    UpdateUserSchema.parse({
      ...req.body,
      ...(req.file && { image: req.file }),
    });
    const user = await ProfileService.updateProfile(req);
    const token = createUserToken(user);
    if (user) {
      res.setHeader("Authorization", `${token}`);
    } else {
      res.status(404).send({ message: "user is not found " });
    }
  } catch (err) {
    next(err);
    return;
  }
  res.status(200).send({ message: "user is updated" + " user" });
  return;
}

async function deleteProfile(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.user) {
      await UserService.deleteUserService(req.user);
      req.user.id;
    } else {
      res.status(404).send({ message: "user is not found" });
      return;
    }
    res.status(204).send({ message: "User is deleted successfully" });
    return;
  } catch (err) {
    next(err);
  }
}

const ProfileController = {
  deleteProfile,
  updateProfile,
  getProfile,
};
export default ProfileController;
