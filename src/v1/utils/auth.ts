import { JwtPayload } from "jsonwebtoken";
import Jwt from "jsonwebtoken";
import { UserType } from "../schemas/user.schema";
import dotenv from "dotenv";
dotenv.config();
export function createUserToken(data: any) {
  return Jwt.sign(
    {
      data: data,
    },
    process.env.SECRETE as string,
    { expiresIn: "1w" }
  );
}

export function verifyToken(token: string): JwtPayload | string {
  return Jwt.verify(token, process.env.SECRETE as string);
}
