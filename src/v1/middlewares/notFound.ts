import { Request, Response, Router } from "express";

const router: Router = Router();

export default router.use("*", (req: Request, res: Response) => {
  res.status(404).send({ message: "this route is not found" });
  return;
});
