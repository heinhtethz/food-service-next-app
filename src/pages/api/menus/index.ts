import prisma, { getSelectedLocationId } from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

const menusHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, price, description, assetUrl, menuCategoryId, locationId } =
      req.body;
    const newMenu = await prisma.menus.create({
      data: {
        name,
        price,
        description,
        assetUrl,
      },
    });
    const newMenuId = newMenu.id;
    await prisma.$transaction(
      menuCategoryId.map((item: number) =>
        prisma.menusMenuCategoriesLocations.create({
          data: {
            menuId: newMenuId,
            menuCategoryId: item,
            locationId,
          },
        })
      )
    );
    res.status(200).send(newMenu);
  } else if (req.method === "PUT") {
    const {
      menuId,
      name,
      price,
      description,
      assetUrl,
      menuCategoryId,
      locationId,
    } = req.body;
    const updateMenu = await prisma.menus.update({
      data: {
        name,
        price,
        description,
        assetUrl,
        updatedAt: new Date(),
      },
      where: {
        id: menuId,
        isArchived: false,
      },
    });
    if (menuCategoryId.length) {
      const existingData = await prisma.menusMenuCategoriesLocations.findMany({
        where: { menuId, locationId: Number(locationId) },
      });
      const existingMenuCategoryId = existingData
        .filter((item) => item.isArchived === false)
        .map((item) => item.menuCategoryId) as number[];

      const addedMenuCategoryId = menuCategoryId.filter(
        (item: number) => !existingMenuCategoryId.includes(item)
      );
      const removedMenuCategoryId = existingMenuCategoryId.filter(
        (item) => !menuCategoryId.includes(item)
      );
      if (addedMenuCategoryId.length) {
        const removedData = existingData
          .filter(
            (item) =>
              item.isArchived === true &&
              addedMenuCategoryId.includes(item.menuCategoryId)
          )
          .map((item) => item.id);
        console.log("removedData :", removedData);
        if (removedData.length) {
          await prisma.menusMenuCategoriesLocations.updateMany({
            data: {
              isArchived: false,
              updatedAt: new Date(),
            },
            where: {
              id: { in: removedData },
            },
          });
        } else {
          addedMenuCategoryId.map(async (item: number) => {
            await prisma.menusMenuCategoriesLocations.createMany({
              data: {
                menuId,
                menuCategoryId: item,
                locationId: Number(locationId),
              },
            });
          });
        }
      } else if (removedMenuCategoryId.length) {
        const removeMenusMenuCategoriesLocations =
          await prisma.menusMenuCategoriesLocations.updateMany({
            data: {
              isArchived: true,
              updatedAt: new Date(),
            },
            where: {
              menuId,
              menuCategoryId: { in: removedMenuCategoryId },
              isArchived: false,
            },
          });
      }
    }
    res.status(200).send(updateMenu);
  }
};

export default menusHandler;
