import { Router } from "express";
import signUpController from "../controllers/sign-up.controller";
const router: Router = Router();
export default router.post("/sign-up", signUpController);
