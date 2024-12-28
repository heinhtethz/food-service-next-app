/*
  Warnings:

  - You are about to drop the column `price` on the `Orderlines` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orderlines" DROP COLUMN "price",
ADD COLUMN     "ramdomMenuId" TEXT;
