/*
  Warnings:

  - You are about to drop the column `bgClassName` on the `GoodItem` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GoodItem" DROP COLUMN "bgClassName",
ADD COLUMN     "background" TEXT NOT NULL DEFAULT '';
