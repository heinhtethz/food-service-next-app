// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";

const backoffice = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method;
  if (method === "POST") {
    const { name, email } = req.body;
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser?.email === email) return res.send(400);
    await prisma.user.create({
      data: {
        name,
        email,
      },
    });
    return res.send(200);
  }
  res.send(405);
};

export default backoffice;
