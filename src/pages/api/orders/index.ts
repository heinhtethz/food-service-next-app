// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma, { getCartTotalPrice } from "@/utils";
import { Menus, OrderStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "POST") {
    const query = req.query;
    const locationId = query.locationId as string;
    const tableId = query.tableId as string;
    const cart = req.body.carts;
    const isValid = locationId && tableId && cart.length;
    if (!isValid) return res.status(400).send("Bad request");
    // create order

    const orderData = {
      locationId: Number(locationId),
      tableId: Number(tableId),
      isPaid: false,
      price: getCartTotalPrice(cart),
    };

    const newOrder = await prisma.orders.create({ data: orderData });
    cart.forEach(async (orderline: any) => {
      const menu = orderline.menu;
      const hasAddons = orderline.addons.length;
      if (hasAddons) {
        const addons = orderline.addons;
        const orderlineData = addons.map((item: any) => ({
          ramdomMenuId: orderline.id,
          menuId: menu.id,
          addonId: item.id,
          orderId: newOrder.id,
          quantity: orderline.quantity,
          orderStatus: OrderStatus.PENDING,
        }));
        await prisma.orderlines.createMany({ data: orderlineData });
      } else {
        await prisma.orderlines.create({
          data: {
            menuId: menu.id,
            orderId: newOrder.id,
            quantity: orderline.quantity,
            ramdomMenuId: orderline.ramdomMenuId,
          },
        });
      }
    });
    res.status(200).json(newOrder);
  }
}
