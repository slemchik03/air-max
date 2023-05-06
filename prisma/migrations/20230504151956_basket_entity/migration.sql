/*
  Warnings:

  - You are about to drop the column `image` on the `GoodItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoodItem" DROP COLUMN "image";

-- CreateTable
CREATE TABLE "BasketItem" (
    "id" TEXT NOT NULL,
    "basketId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,

    CONSTRAINT "BasketItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "userId" TEXT NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "GoodItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BasketItem" ADD CONSTRAINT "BasketItem_basketId_fkey" FOREIGN KEY ("basketId") REFERENCES "Basket"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
