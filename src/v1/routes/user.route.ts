import { Router } from "express";
import isIdExistMW from "../middlewares/isIdExist";
import UserController from "../controllers/user.controller";
import upload from "../config/multer.config";
// import { updateUser } from "../services/user.service";
const router: Router = Router();
const path = "/user/:id";
router.use(isIdExistMW);
router.get(path, UserController.getUser);
router.delete(path, UserController.deleteUser);
router.use(upload.single("image"));
router.patch(path, UserController.updateUser);
export default router;
