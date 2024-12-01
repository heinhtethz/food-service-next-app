import prisma from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, price, addonCategoryId } = req.body;
    if (!name && !addonCategoryId)
      return res.status(405).send("Method Not allowed");
    const newAddon = await prisma.addons.create({
      data: { name, price, addonCategoryId },
    });
    return res.status(200).send(newAddon);
  } else if (req.method === "PUT") {
    const { name, price, addonCategoryId, addonId } = req.body;
    if (!name && !price && !addonCategoryId.length)
      return res.status(405).send("Method Not allowed");
    const updateAddon = await prisma.addons.updateMany({
      data: { name, price, addonCategoryId: addonCategoryId[0] },
      where: { id: addonId as number },
    });
    return res.status(200).send(updateAddon);
  } else if (req.method === "DELETE") {
    const addonId = req.query.id as string;
    await prisma.addons.update({
      data: { isArchived: true },
      where: { id: Number(addonId) },
    });
    return res.send(200);
  } else {
    res.status(401).send("Unauthorized");
  }
};

export default handler;
