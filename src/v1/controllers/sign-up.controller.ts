import { NextFunction, Request, Response } from "express";
import { UserSchema, UserType } from "../schemas/user.schema";
import { createUserToken } from "../utils/auth";
import UserService from "../services/user.service";
import bcrypt from "bcrypt";

export default async function signUpController(
  req: Request<{}, {}, UserType>,
  res: Response,
  next: NextFunction
) {
  try {
    const validUser = UserSchema.parse(req.body);
    validUser.password = await bcrypt.hash(validUser.password, 10);
    const user = await UserService.createUserService(validUser);

    const token = createUserToken(user);
    res.setHeader("Authorization", `${token}`);
    res.status(201).send({ message: "user created successfully", user: user });
  } catch (err) {
    next(err);
  }
}
