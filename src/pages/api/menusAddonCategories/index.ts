import prisma from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const queryMenuIds = req.query.menuIds as string;
    if (!queryMenuIds) return res.status(405).send("Method not allowed");
    const menuIds = queryMenuIds.split(",").map((item) => Number(item));
    const menusAddonCategories = await prisma.menusAddonCategories.findMany({
      where: { menuId: { in: menuIds } },
    });
    return res.status(200).send(menusAddonCategories);
  }
  res.status(405).send("Method not allowed");
}
