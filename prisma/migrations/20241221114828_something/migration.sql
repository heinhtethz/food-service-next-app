/*
  Warnings:

  - Made the column `ramdomMenuId` on table `Orderlines` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Orderlines" ALTER COLUMN "ramdomMenuId" SET NOT NULL;
