/*
  Warnings:

  - The primary key for the `GoodItem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `GoodItem` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `GoodItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `categoryId` to the `GoodItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `GoodItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `GoodItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GoodItem" DROP CONSTRAINT "GoodItem_pkey",
DROP COLUMN "category",
ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GoodItem_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GoodItem_id_seq";

-- DropTable
DROP TABLE "Categories";

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Category_title_id_idx" ON "Category"("title", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE INDEX "GoodItem_categoryId_sizes_price_idx" ON "GoodItem"("categoryId", "sizes", "price");

-- CreateIndex
CREATE UNIQUE INDEX "GoodItem_title_key" ON "GoodItem"("title");

-- AddForeignKey
ALTER TABLE "GoodItem" ADD CONSTRAINT "GoodItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
