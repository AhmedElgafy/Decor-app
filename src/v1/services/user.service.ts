// services/user.service.ts
import prisma from "../config/db";
import { LoginType, UserType } from "../schemas/user.schema";
import { createUserToken } from "../utils/auth";

export async function loginUserService(data: LoginType) {
  const user = await prisma.user.findFirst({
    where: {
      AND: [{ email: data.email }, { password: data.password }],
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      birthDate: true,
      gender: true,
      image: true,
    },
  });

  if (!user) {
    return null;
  }

  const token = createUserToken(user);

  return { user, token };
}
export async function createUserService(user: UserType) {
  const userNew = await prisma.user.create({ data: user });
  return userNew;
}
export async function getUserById(id: number | undefined) {
  return await prisma.user.findUnique({ where: { id: id } });
}
