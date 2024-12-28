/*
  Warnings:

  - You are about to drop the `orderlines` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "orderlines" DROP CONSTRAINT "orderlines_addonId_fkey";

-- DropForeignKey
ALTER TABLE "orderlines" DROP CONSTRAINT "orderlines_menuId_fkey";

-- DropForeignKey
ALTER TABLE "orderlines" DROP CONSTRAINT "orderlines_orderId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_locationId_fkey";

-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_tableId_fkey";

-- DropTable
DROP TABLE "orderlines";

-- DropTable
DROP TABLE "orders";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "locationId" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orderlines" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "addonId" INTEGER,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "orderStatus" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Orderlines_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Locations"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Tables"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orderlines" ADD CONSTRAINT "Orderlines_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orderlines" ADD CONSTRAINT "Orderlines_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menus"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Orderlines" ADD CONSTRAINT "Orderlines_addonId_fkey" FOREIGN KEY ("addonId") REFERENCES "Addons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
