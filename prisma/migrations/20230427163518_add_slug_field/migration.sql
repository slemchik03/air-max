-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "GoodItem" ADD COLUMN     "slug" TEXT NOT NULL DEFAULT '';
