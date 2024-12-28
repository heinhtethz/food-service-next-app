import { Addons, Menus } from "@prisma/client";

export enum OrderlineStatus {
  PENDING = "PENDING",
  PREPARING = "PREPARING",
  COMPLETE = "COMPLETE",
}

export interface CartItem {
  id: string;
  menu: Menus;
  addons: Addons[];
  quantity: number;
}
