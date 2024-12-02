import prisma from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const tableHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const { name } = req.body;
    const tableId = req.query.id as string;
    if (name) {
      const updateTable = await prisma.tables.update({
        data: { name },
        where: { id: Number(tableId) },
      });
      return res.status(200).send(updateTable);
    } else {
      return res.status(401).send("Bad Request");
    }
  } else if (req.method === "DELETE") {
    const tableId = req.query.id as string;
    await prisma.tables.update({
      data: { isArchived: true },
      where: { id: Number(tableId) },
    });
    return res.send(200);
  } else if (req.method === "POST") {
    const { name, locationId } = req.body;
    if (name) {
      const newTable = await prisma.tables.create({
        data: { name, locationId, assetUrl: "" },
      });
      return res.status(200).send(newTable);
    } else {
      return res.status(401).send("Bad Request");
    }
  } else {
    res.status(405).send("Method Not Allowed");
  }
};

export default tableHandler;
