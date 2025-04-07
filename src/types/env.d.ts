// import { Request } from "express";
// import { User } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      PORT?: string;
      //   PWD: string;
      SECRETE: string;
    }
  }
}
// declare global {
//   namespace Express {
//     interface Request {
//       user?: User; // or just `any` if you haven't typed it
//     }
//   }
// }
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
// export {};
