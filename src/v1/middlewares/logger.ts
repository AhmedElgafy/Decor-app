import { Request, Response, NextFunction } from "express";
import logger from "../config/logger";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.info(
      `\x1b[32m${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms\x1b[0m`
    );
    // console.log(
    //   `\x1b[32m${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms\x1b[0m`
    // );
  });

  next();
};

export default requestLogger;
