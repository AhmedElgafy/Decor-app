// controllers/auth.controller.ts
import { Request, Response } from "express";
import { LoginSchema, LoginType } from "../schemas/user.schema";
import { loginUserService } from "../services/user.service";
export default async function loginController(
  req: Request<{}, {}, LoginType>,
  res: Response
) {
  const result = LoginSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json(result.error.flatten().fieldErrors);
    return;
  }

  const { email, password } = result.data;

  const loginResult = await loginUserService({ email, password });

  if (!loginResult) {
    res
      .status(404)
      .json({ message: "User does not exist or credentials are incorrect" });
    return;
  }

  const { token } = loginResult;

  res.cookie("token", token);
  res.setHeader("Authentication", `token ${token}`);
  res.status(201).json({ message: "Login successfully", token });
  return;
}
