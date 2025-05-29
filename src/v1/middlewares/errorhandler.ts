import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";

export default function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof JsonWebTokenError) {
    res.status(401).json({ massage: "You are unauthorized" });
    return;
  }
  if (err instanceof ZodError) {
    res.status(400).send(err.flatten().fieldErrors);
    return;
  }
  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code == "P2002") {
      const target: string[] = err?.meta?.target as string[];
      res.status(400).send({ message: `${target[0]} is already exist` });
      return;
    }
    if (err.code == "P2025") {
      console.log(err);
      res.status(400).send(err.meta);
    }
    if (err.code == "P2003") {
      res.status(400).send({
        message:
          err.meta?.modelName +
          " foreign key constraint failed. Please check related data.",
      });
      return;
    } else {
      console.log(err);
      res.status(500).send({ message: "Database error" });
      return;
    }
  } else {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
}
