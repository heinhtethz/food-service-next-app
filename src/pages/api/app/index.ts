// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/utils";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function appHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).send("Unauthorized");
  const user = session.user;
  const email = user?.email as string;
  const name = user?.name as string;
  const userFromDB = await prisma.users.findFirst({ where: { email } });
  if (!userFromDB) {
    const newCompany = await prisma.company.create({
      data: {
        name: "Default companies",
        address: "Default address",
      },
    });
    await prisma.users.create({
      data: {
        name,
        email,
        companyId: newCompany.id,
        password: "",
      },
    });
    const newLocation = await prisma.locations.create({
      data: {
        name: "Default location",
        address: "Default address",
        companyId: newCompany.id,
      },
    });
    const newMenusData = [
      { name: "mote-hinn-kharr", price: 500, description: "", assetUrl: "" },
      { name: "shan-khout-swell", price: 1500, description: "", assetUrl: "" },
    ];
    const newMenus = await prisma.$transaction(
      newMenusData.map((menu) => prisma.menus.create({ data: menu }))
    );
    const newMenuCategoriesData = [
      { name: "Default category 1" },
      { name: "Default category 2" },
    ];
    const newMenuCategories = await prisma.$transaction(
      newMenuCategoriesData.map((menuCategory) =>
        prisma.menuCategories.create({ data: menuCategory })
      )
    );
    const newMenusMenuCategoriesLocationsData = [
      {
        menuId: newMenus[0].id,
        menuCategoryId: newMenuCategories[0].id,
        locationId: newLocation.id,
      },
      {
        menuId: newMenus[1].id,
        menuCategoryId: newMenuCategories[1].id,
        locationId: newLocation.id,
      },
    ];
    const newMenusMenuCategoriesLocations = await prisma.$transaction(
      newMenusMenuCategoriesLocationsData.map(
        (newMenusMenuCategoriesLocations) =>
          prisma.menusMenuCategoriesLocations.create({
            data: newMenusMenuCategoriesLocations,
          })
      )
    );
    const newAddonCategoriesData = [{ name: "Drinks" }, { name: "Sizes" }];
    const newAddonCategories = await prisma.$transaction(
      newAddonCategoriesData.map((addonCategory) =>
        prisma.addonCategories.create({ data: addonCategory })
      )
    );
    const newMenusAddonCategories =
      await prisma.menusAddonCategories.createMany({
        data: [
          {
            menuId: newMenus[0].id,
            addonCategoryId: newAddonCategories[0].id,
          },
          {
            menuId: newMenus[1].id,
            addonCategoryId: newAddonCategories[1].id,
          },
        ],
      });

    const newAddonsData = [
      {
        name: "Cola",
        price: 500,
        addonCategoryId: newAddonCategories[0].id,
      },
      {
        name: "Pepsi",
        price: 500,
        addonCategoryId: newAddonCategories[0].id,
      },
      {
        name: "Large",
        price: 200,
        addonCategoryId: newAddonCategories[1].id,
      },
      {
        name: "Normal",
        price: 0,
        addonCategoryId: newAddonCategories[1].id,
      },
    ];
    const newAddons = await prisma.$transaction(
      newAddonsData.map((addon) => prisma.addons.create({ data: addon }))
    );

    const newTableData = [
      { name: "Table 01", locationId: newLocation.id, assetUrl: "" },
      { name: "Table 02", locationId: newLocation.id, assetUrl: "" },
    ];

    const newTables = await prisma.$transaction(
      newTableData.map((table) => prisma.tables.create({ data: table }))
    );

    return res.send({
      menus: newMenus,
      menuCategories: newMenuCategories,
      addons: newAddons,
      addonCategories: newAddonCategories,
      menusAddonCategories: newMenusAddonCategories,
      locations: newLocation,
      menusMenuCategoriesLocations: newMenusMenuCategoriesLocations,
      company: newCompany,
      tables: newTables,
    });
  } else {
    const companyId = userFromDB.companyId as number;
    const locations = await prisma.locations.findMany({
      where: {
        companyId: companyId,
        isArchived: false,
      },
    });
    const locationIds = locations.map((location) => location.id);
    const menusMenuCategoriesLocations =
      await prisma.menusMenuCategoriesLocations.findMany({
        where: {
          locationId: {
            in: locationIds,
          },
          isArchived: false,
        },
      });
    const menuCategoryIds = menusMenuCategoriesLocations.map(
      (item) => item.menuCategoryId
    );
    const menuIds = menusMenuCategoriesLocations
      .map((item) => item.menuId)
      .filter((item) => item !== null) as number[];
    const menuCategories = await prisma.menuCategories.findMany({
      where: {
        id: {
          in: menuCategoryIds,
        },
        isArchived: false,
      },
    });

    const menus = await prisma.menus.findMany({
      where: {
        id: {
          in: menuIds,
        },
        isArchived: false,
      },
    });
    const menusAddonCategories = await prisma.menusAddonCategories.findMany({
      where: {
        menuId: {
          in: menuIds,
        },
      },
    });

    const addonCategoryIds = menusAddonCategories.map(
      (menuAddonCategoryId) => menuAddonCategoryId.addonCategoryId
    ) as number[];
    const addonCategories = await prisma.addonCategories.findMany({
      where: {
        id: {
          in: addonCategoryIds,
        },
        isArchived: false,
      },
    });
    const addons = await prisma.addons.findMany({
      where: {
        addonCategoryId: {
          in: addonCategoryIds,
        },
        isArchived: false,
      },
    });
    const tables = await prisma.tables.findMany({
      where: {
        locationId: {
          in: locationIds,
        },
        isArchived: false,
      },
    });
    const company = await prisma.company.findFirst({
      where: {
        id: companyId,
      },
    });
    /* 
    const orders = await prisma.orders.findMany({
      where: { locationId: { in: locationIds } },
    });
    const orderIds = orders.map((item) => item.id);
    const orderlines = await prisma.orderlines.findMany({
      where: { orderId: { in: orderIds } },
    });
    */
    res.send({
      menus,
      menuCategories,
      addons,
      addonCategories,
      locations,
      menusAddonCategories,
      menusMenuCategoriesLocations,
      company,
      tables,
    });
  }
}
