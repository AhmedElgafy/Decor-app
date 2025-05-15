/*
  Warnings:

  - A unique constraint covering the columns `[productId,userId]` on the table `Rate` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Rate_productId_userId_key" ON "Rate"("productId", "userId");
