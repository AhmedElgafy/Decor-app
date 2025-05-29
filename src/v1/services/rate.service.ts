import { Rate } from "@prisma/client";
import prisma from "../config/db";
import { rateSchema } from "../schemas/rate.schema";
// GET all rates
async function getRateByProductId(productId: number): Promise<Rate[] | null> {
  const rate = await prisma.rate.findMany({
    where: {
      productId: productId,
    },
  });
  return rate;
}
// POST a rate
async function createRate(rateData: Omit<Rate, "id">): Promise<Rate> {
  console.log("Creating rate with data:", rateData);
  const validRateData = rateSchema.partial({ id: true }).parse(rateData);
  const rate = await prisma.rate.create({
    data: validRateData,
  });
  return rate;
}
// DELETE a rate
async function deleteRate(rateId: number,userId:number): Promise<Rate | null> {
  const rate = await prisma.rate.delete({
    where: {
      id: rateId,userId: userId,
    },
  });
  return rate;
}
// PATCH rate
async function updateRate(rateData: Partial<Rate>): Promise<Rate | null> {
  const validRateData = rateSchema
    .partial()
    .required({ productId: true, userId: true })
    .parse(rateData);
  const rate = await prisma.rate.update({
    where: {
      productId_userId: {
        productId: validRateData.productId,
        userId: validRateData.userId,
      },
    },
    data: validRateData,
  });
  return rate;
}
export default {
  getRateByProductId,
  createRate,
  deleteRate,
  updateRate,
};
