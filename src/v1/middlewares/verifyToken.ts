import { NextFunction, Request, Response, Router } from "express";
import { verifyToken } from "../utils/auth";
import { User } from "@prisma/client";
const router: Router = Router();

router.all("*", (req: Request, res: Response, next: NextFunction) => {
  const user = verifyToken(req.headers["authorization"]?.split(" ")[1] || "") as {
    data: User;
  };
  req.user = user.data;
  next();
});
export default router;
