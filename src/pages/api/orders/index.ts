// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma, { getCartTotalPrice } from "@/utils";
import { OrderStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if (method === "GET") {
    const locationId = Number(req.query.locationId);
    if (!locationId) return res.status(400).send("Bad request");
    const location = await prisma.locations.findFirst({
      where: { id: locationId, isArchived: false },
    });

    const menusMenuCategoriesLocations =
      await prisma.menusMenuCategoriesLocations.findMany({
        where: {
          locationId: locationId,
          isArchived: false,
        },
      });
    const menuIds = menusMenuCategoriesLocations
      .map((item) => item.menuId)
      .filter((item) => item !== null) as number[];
    const menuCategoryIds = menusMenuCategoriesLocations.map(
      (item) => item.menuCategoryId
    );
    const menus = await prisma.menus.findMany({
      where: { id: { in: menuIds }, isArchived: false },
    });
    const menuCategories = await prisma.menuCategories.findMany({
      where: { id: { in: menuCategoryIds }, isArchived: false },
    });
    const menusAddonCategories = await prisma.menusAddonCategories.findMany({
      where: { menuId: { in: menuIds } },
    });
    const validAddonCategoryIds = menusAddonCategories.map(
      (item) => item.addonCategoryId
    ) as number[];
    const addonCategories = await prisma.addonCategories.findMany({
      where: { id: { in: validAddonCategoryIds }, isArchived: false },
    });
    const addons = await prisma.addons.findMany({
      where: {
        addonCategoryId: { in: validAddonCategoryIds },
        isArchived: false,
      },
    });
    const orders = await prisma.orders.findMany({
      where: { locationId: locationId },
    });
    const orderIds = orders.map((item) => item.id);
    const orderlines = await prisma.orderlines.findMany({
      where: { orderId: { in: orderIds } },
    });
    res.send({
      location: [location],
      menus,
      menuCategories,
      menusMenuCategoriesLocations,
      menusAddonCategories,
      addonCategories,
      addons,
      orders,
      orderlines,
    });
  } else if (method === "POST") {
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
          },
        });
      }
    });
    res.status(200).send(newOrder);
  }
}
