import { Request, Response, Router } from "express";
import profileController from "../controllers/profile.controller";
const router: Router = Router();
export default router.get("/profile", profileController);
router.patch("/profile", (req: Request, res: Response) => {
  res.status(200).send("HI");
});
