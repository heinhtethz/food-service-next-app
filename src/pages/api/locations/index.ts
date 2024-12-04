import prisma from "@/utils";
import { NextApiRequest, NextApiResponse } from "next";

const handleLocations = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { name, address, companyId } = req.body;
    if (name && companyId) {
      const newLocation = await prisma.locations.create({
        data: { name, address, companyId },
      });
      return res.status(200).send(newLocation);
    } else {
      res.status(405).send("Method not allowed");
    }
  } else if (req.method === "PUT") {
    const { name, address, id, companyId } = req.body;
    if (name && id) {
      const updateLocation = await prisma.locations.update({
        data: { name, address, companyId },
        where: { id },
      });
      return res.status(200).send(updateLocation);
    } else {
      res.status(405).send("Method not allowed");
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(401).send("Bad Request");
    const deleteLocation = await prisma.locations.update({
      data: { isArchived: true },
      where: { id },
    });
    return res.status(200).send(deleteLocation);
  }
};

export default handleLocations;
