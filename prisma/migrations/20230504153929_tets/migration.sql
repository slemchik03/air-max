/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Basket` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "GoodItem" ADD COLUMN     "image" TEXT NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX "Basket_userId_key" ON "Basket"("userId");
