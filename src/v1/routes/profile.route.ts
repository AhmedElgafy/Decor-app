import { Router } from "express";

import upload from "../config/multer.config";
import ProfileController from "../controllers/profile.controller";
const router: Router = Router();
router.get("/profile", ProfileController.getProfile);
router.patch(
  "/profile",
  upload.single("image"),
  ProfileController.updateProfile
);
router.delete("/profile", ProfileController.deleteProfile);

export default router;
