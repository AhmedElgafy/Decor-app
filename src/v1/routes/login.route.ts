import { Router } from "express";
import loginController from "../controllers/login.controller";
const router: Router = Router();
export default router.post("/login", loginController);
