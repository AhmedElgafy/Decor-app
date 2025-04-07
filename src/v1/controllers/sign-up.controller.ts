import { NextFunction, Request, Response } from "express";
import { UserSchema, UserType } from "../schemas/user.schema";
import { createUserService } from "../services/user.service";

export default async function signUpController(
  req: Request<{}, {}, UserType>,
  res: Response,
  next: NextFunction
) {
  try {
    const validUser = UserSchema.parse(req.body);
    const user = await createUserService(validUser);
    res.status(201).send({ message: "user created successfully", user: user });
  } catch (err) {
    next(err);
  }
}
