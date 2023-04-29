/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `GoodItem` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "GoodItem" ADD COLUMN     "advantages" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "remains" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "GoodItem_slug_key" ON "GoodItem"("slug");
