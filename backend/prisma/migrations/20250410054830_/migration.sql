-- CreateEnum
CREATE TYPE "DiscountType" AS ENUM ('PERCENTAGE', 'FIXED', 'WEIGHTED');

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "row_status" SET DEFAULT '1',
ALTER COLUMN "updatedAt" DROP DEFAULT;

-- CreateTable
CREATE TABLE "promotions" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "discount_type" "DiscountType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "row_status" TEXT NOT NULL DEFAULT '1',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "discount_value" DOUBLE PRECISION,
    "min_weight" DOUBLE PRECISION,
    "max_weight" DOUBLE PRECISION,
    "unit_price" DOUBLE PRECISION,

    CONSTRAINT "promotions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductsToPromotions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToPromotions_AB_unique" ON "_ProductsToPromotions"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToPromotions_B_index" ON "_ProductsToPromotions"("B");

-- AddForeignKey
ALTER TABLE "_ProductsToPromotions" ADD CONSTRAINT "_ProductsToPromotions_A_fkey" FOREIGN KEY ("A") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToPromotions" ADD CONSTRAINT "_ProductsToPromotions_B_fkey" FOREIGN KEY ("B") REFERENCES "promotions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
