import { NextFunction, Request, Response, Router } from "express";
import { uploadFile } from "../services/cloudinary.service";


const router: Router = Router();

router.all(
  "*",
  async (
    req: Request<{}, {}, { image: string }>,
    res: Response,
    next: NextFunction
  ) => {
    if (req.file) {
      const url = await uploadFile(req.file);
      req.body.image = url || "";
    }
    next();
  }
);
export default router;
