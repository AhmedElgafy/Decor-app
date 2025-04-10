import { NextFunction, Request, Response } from "express";

export default function isIdExistMW(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(req.params);
  if (req.params.id && Number.isNaN(Number(req.params.id))) {
    res.status(400).send({ message: "You have to set an Id in the URL" });
    return;
  }

  next();
}
