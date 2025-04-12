/*
  Warnings:

  - You are about to drop the `_ProductsToPromotions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductsToPromotions" DROP CONSTRAINT "_ProductsToPromotions_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductsToPromotions" DROP CONSTRAINT "_ProductsToPromotions_B_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "promotionId" INTEGER;

-- DropTable
DROP TABLE "_ProductsToPromotions";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_promotionId_fkey" FOREIGN KEY ("promotionId") REFERENCES "promotions"("id") ON DELETE SET NULL ON UPDATE CASCADE;
