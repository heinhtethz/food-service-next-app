import prisma from "@/utils";
import { Addons, OrderStatus } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const orderlinesHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { ramdomMenuId, status } = req.body;
    const updateOrderline = await prisma.orderlines.updateMany({
      data: { orderStatus: status },
      where: { ramdomMenuId },
    });
    res.status(200).send(updateOrderline);
  }
};

export default orderlinesHandler;
