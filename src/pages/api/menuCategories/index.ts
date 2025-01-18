import prisma from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const menuCategoryHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    const { name, menuIds, menuCategoryId, locationId } = req.body;
    if (name) {
      const updateMenuCategory = await prisma.menuCategories.update({
        data: { name },
        where: { id: menuCategoryId as number },
      });
      res.status(200).send(updateMenuCategory);
    }
    if (menuIds.length) {
      const existingData = await prisma.menusMenuCategoriesLocations.findMany({
        where: { menuCategoryId, locationId },
      });

      const existingMenuIds = existingData
        .filter((item) => item.menuId && item.isArchived === false)
        .map((item) => item.menuId);

      const addingMenuIds = menuIds.filter(
        (item: number) => !existingMenuIds.includes(item)
      );
      const removingMenuIds = existingMenuIds.filter(
        (item) => !menuIds.includes(item)
      ) as number[];

      if (addingMenuIds.length) {
        const removedData = existingData
          .filter(
            (item) =>
              item.isArchived === true && addingMenuIds.includes(item.menuId)
          )
          .map((item) => item.id);
        if (removedData.length) {
          await prisma.menusMenuCategoriesLocations.updateMany({
            data: { isArchived: false, updatedAt: new Date() },
            where: {
              id: { in: removedData },
            },
          });
        } else {
          addingMenuIds.map(async (item: number) => {
            await prisma.menusMenuCategoriesLocations.createMany({
              data: { menuId: item, menuCategoryId, locationId },
            });
          });
        }
      }
      if (removingMenuIds.length) {
        await prisma.menusMenuCategoriesLocations.updateMany({
          data: { isArchived: true, updatedAt: new Date() },
          where: { menuId: { in: removingMenuIds } },
        });
      }
      return res.status(200).send("Ok");
    }
  } else if (req.method === "POST") {
    const { name, locationId } = req.body;
    const newMenuCategory = await prisma.menuCategories.create({
      data: { name },
    });

    const newMenuCategoryId = newMenuCategory.id;
    await prisma.menusMenuCategoriesLocations.create({
      data: {
        menuCategoryId: newMenuCategoryId,
        locationId: locationId as number,
      },
    });

    return res.status(200).send(newMenuCategory);
  } else if (req.method === "DELETE") {
    const menuCategoryId = req.query.id;
    const locationId = req.query.locationId;
    if (!menuCategoryId) return res.status(400).send("Bad Request");
    await prisma.menuCategories.update({
      data: { isArchived: true },
      where: { id: Number(menuCategoryId) },
    });
    await prisma.menusMenuCategoriesLocations.updateMany({
      data: { isArchived: true },
      where: {
        menuCategoryId: Number(menuCategoryId),
        locationId: Number(locationId),
      },
    });
    return res.send(200);
  } else {
    return res.status(405).send("Method not allowed");
  }
};

export default menuCategoryHandler;
