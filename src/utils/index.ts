import { CartItem } from "@/typings";
import {
  AddonCategories,
  Addons,
  MenuCategories,
  Menus,
  MenusAddonCategories,
  MenusMenuCategoriesLocations,
  Orderlines,
  PrismaClient,
} from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;

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

export const menusByMenuCategoryId = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[],
  menus: Menus[],
  menuCategoryId: Number,
  selectedLocationId: Number
) => {
  const validMenus = menusMenuCategoriesLocations
    .filter(
      (item) =>
        item.menuCategoryId === menuCategoryId &&
        item.locationId === selectedLocationId &&
        item.isArchived === false
    )
    .map((item) => item.menuId);
  return menus.filter((item) => validMenus.includes(item.id));
};

export const orderlinesByRamdomMenuId = (orderlines: Orderlines[]) => {
  let orderline = [] as Orderlines[];
  orderlines.forEach((item) => {
    if (!orderline.length) {
      orderline = [item];
    } else {
      const isAlredy = orderline.find(
        (elem) => elem.ramdomMenuId === item.ramdomMenuId
      );
      if (isAlredy) {
        return;
      } else {
        orderline = [...orderline, item];
      }
    }
  });
  return orderline;
};

export const getNumberOfMenusByOrderId = (
  orderlines: Orderlines[],
  orderId: number
) => {
  const orderline = orderlinesByRamdomMenuId(orderlines);
  const validOrderline = orderline.filter((item) => item.orderId === orderId);

  const quantity = validOrderline
    .map((item) => item.quantity)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return quantity;
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

export const addonCategoriesByMenuId = (
  addonCategories: AddonCategories[],
  menusAddonCategories: MenusAddonCategories[],
  menuId: Number
) => {
  const validAddonCategoryId = menusAddonCategories
    .filter((item) => item.menuId === menuId)
    .map((item) => item.addonCategoryId);
  return addonCategories.filter((item) =>
    validAddonCategoryId.includes(item.id)
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

export const menusMenuCategoriesLocationsByLocationId = (
  menusMenuCategoriesLocations: MenusMenuCategoriesLocations[]
) => {
  const selectedLocationId = getSelectedLocationId();
  return menusMenuCategoriesLocations.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );
};

export const generateRandomId = () =>
  (Math.random() + 1).toString(36).substring(7);

export const getCartTotalPrice = (cart: CartItem[]) => {
  const totalPrice = cart.reduce((acc, cur) => {
    const menuPrice = cur.menu.price;
    const totalAddonPrice = cur.addons.reduce((a, c) => (a += c.price), 0);
    return (acc += (menuPrice + totalAddonPrice) * cur.quantity);
  }, 0);
  return totalPrice;
};
