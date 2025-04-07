import { User } from "@prisma/client";
import { Request } from 'express';
declare global {
    namespace Express {
      interface Request {
        user?: User; // or just `any` if you haven't typed it
      }
    }
  }
//   export {}