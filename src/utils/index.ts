import {
  AddonCategories,
  Addons,
  MenuCategories,
  Menus,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();

export const getSelectedLocationId = () => {
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("selectedLocationId");
  }
};

export const menuCategoryByLocationId = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menuCategories: MenuCategories[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuCategoryIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuCategoryId);
  return menuCategories.filter((item) =>
    validMenuCategoryIds.includes(item.id as number)
  );
};

export const menuByLocationId = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menus: Menus[]
) => {
  const selectedLocationId = getSelectedLocationId();
  const validMenuIds = menusMenuCategoriesLocations
    .filter((item) => item.locationId === Number(selectedLocationId))
    .map((item) => item.menuId);
  return menus.filter((item) => validMenuIds.includes(item.id as number));
};

export const addonCategoryByLocationId = (
  addonCategories: AddonCategories[],
  menus: Menus[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menusAddonCategories: MenusAddonCategories[]
) => {
  const validMenuIds = menuByLocationId(
    menusMenuCategoriesLocations,
    menus
  ).map((item) => item.id);
  const validAddonCategoryId = menusAddonCategories
    .filter((item) => validMenuIds.includes(item.menuId as number))
    .map((item) => item.addonCategoryId);
  return addonCategories.filter((item) =>
    validAddonCategoryId.includes(item.id as number)
  );
};

export const addonByLocationId = (
  addonCategories: AddonCategories[],
  menus: Menus[],
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menusAddonCategories: MenusAddonCategories[],
  addons: Addons[]
) => {
  const validAddonCategoryIds = addonCategoryByLocationId(
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menusAddonCategories
  ).map((item) => item.id);
  return addons.filter((item) =>
    validAddonCategoryIds.includes(item.addonCategoryId)
  );
};

export const menusMenuCategoriesLocationsByLocation = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  return menusMenuCategoriesLocations.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );
};

export default prisma;
