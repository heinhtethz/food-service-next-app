import prisma from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const addonCategoryHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method === "PUT") {
    const { name, menuIds, addonCategoryId } = req.body;
    const updateAddonCategory = await prisma.addonCategories.update({
      data: { name },
      where: { id: addonCategoryId },
    });

    if (menuIds.length) {
      const existingMenus = await prisma.menusAddonCategories.findMany({
        where: { addonCategoryId },
      });
      const existingMenuId = existingMenus
        .filter((item) => item.isArchived === false)
        .map((item) => item.menuId);
      const addingMenuId = menuIds.filter(
        (item: number) => !existingMenuId.includes(item)
      );
      const removingMenuId = existingMenuId.filter(
        (item: number) => !menuIds.includes(item)
      );
      if (addingMenuId.length) {
        const removedData = existingMenus
          .filter(
            (item) =>
              addingMenuId.includes(item.menuId) && item.isArchived === true
          )
          .map((item) => item.id);
        if (removedData.length) {
          await prisma.menusAddonCategories.updateMany({
            data: { isArchived: false },
            where: { id: { in: removedData } },
          });
        } else {
          addingMenuId.forEach(async (item: number) => {
            await prisma.menusAddonCategories.createMany({
              data: { menuId: item, addonCategoryId },
            });
          });
        }
      }
      if (removingMenuId.length) {
        await prisma.menusAddonCategories.updateMany({
          data: { isArchived: true },
          where: { menuId: { in: removingMenuId }, addonCategoryId },
        });
      }
    }
    return res.status(200).send(updateAddonCategory);
  } else if (req.method === "POST") {
    const { name, menuIds, isRequired } = req.body;
    if (!name) return res.status(401).send("Bad request");
    const newAddonCategory = await prisma.addonCategories.create({
      data: { name, isRequired },
    });
    const newAddonCategoryId = newAddonCategory.id as number;
    if (menuIds.length) {
      menuIds.forEach(async (item: number) => {
        await prisma.menusAddonCategories.createMany({
          data: { menuId: item, addonCategoryId: newAddonCategoryId },
        });
      });
    }
    return res.status(200).send(newAddonCategory);
  } else if (req.method === "DELETE") {
    const id = req.query.id as string;
    const addonCategoryId = Number(id);
    if (!addonCategoryId) return res.status(401).send("Bad request");
    await prisma.addonCategories.update({
      data: { isArchived: true },
      where: { id: addonCategoryId },
    });
    return res.send(200);
  } else {
    res.status(405).send("Method not allowed");
  }
};

export default addonCategoryHandler;
