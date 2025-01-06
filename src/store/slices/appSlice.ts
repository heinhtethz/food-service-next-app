import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { config } from "@/config/config";
import { setMenus } from "./menusSlice";
import { setMenuCategories } from "./menuCategoriesSlice";
import { setAddons } from "./addonsSlice";
import { setAddonCategories } from "./addonCategoriesSlice";
import { setLocations } from "./locationsSlice";
import { setMenusMenuCategoriesLocations } from "./menusMenuCategoriesLocations";
import { setCompany } from "./companySlice";
import { setMenusAddonCategories } from "./menusAddonCategoriesSlice";
import { setTables } from "./tablesSlice";
import { RootState } from "..";
import { setOrders } from "./ordersSlice";
import { setOrderlines } from "./orderlinesSlice";

interface CounterState {
  isLoading: boolean;
  init: boolean;
  error: Error | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  isLoading: false,
  init: false,
  error: null,
};

interface OrderAppPayload {
  locationId?: string;
}

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async ({ locationId }: OrderAppPayload, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/app?locationId=${locationId}`
    );
    const {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      locations,
      menusMenuCategoriesLocations,
      company,
      tables,
      orders,
      orderlines,
    } = await response.json();
    thunkAPI.dispatch(setMenus(menus));
    thunkAPI.dispatch(setMenuCategories(menuCategories));
    thunkAPI.dispatch(setAddons(addons));
    thunkAPI.dispatch(setAddonCategories(addonCategories));
    thunkAPI.dispatch(setLocations(locations));
    thunkAPI.dispatch(setMenusAddonCategories(menusAddonCategories));
    thunkAPI.dispatch(
      setMenusMenuCategoriesLocations(menusMenuCategoriesLocations)
    );
    thunkAPI.dispatch(setCompany(company));
    thunkAPI.dispatch(setTables(tables));
    thunkAPI.dispatch(setOrders(orders));
    thunkAPI.dispatch(setOrderlines(orderlines));
    thunkAPI.dispatch(setAppLoading(false));
    thunkAPI.dispatch(setInit(true));
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
  },
});

export const { setAppLoading, setInit } = appSlice.actions;
export default appSlice.reducer;

export const selectMenus = (state: RootState) => state.menus.items;
export const selectMenuCategories = (state: RootState) =>
  state.menuCategories.items;
export const selectAddons = (state: RootState) => state.addons.items;
export const selectAddonCategories = (state: RootState) =>
  state.addonCategories.items;
export const selectLocations = (state: RootState) => state.locations.items;
export const selectMenusAddonCategories = (state: RootState) =>
  state.menusAddonCategories.items;
export const selectMenusMenuCategoriesLocations = (state: RootState) =>
  state.menusMenuCategoriesLocations.items;
export const selectCompany = (state: RootState) => state.company.item;
export const selectTables = (state: RootState) => state.tables.items;
export const selectCarts = (state: RootState) => state.carts.items;
export const selectOrders = (state: RootState) => state.orders.items;
export const selectOrderlines = (state: RootState) => state.orderlines.items;

export const appData = createSelector(
  [
    selectMenus,
    selectMenuCategories,
    selectAddons,
    selectAddonCategories,
    selectLocations,
    selectMenusAddonCategories,
    selectMenusMenuCategoriesLocations,
    selectCompany,
    selectTables,
    selectOrders,
    selectOrderlines,
    selectCarts,
  ],
  (
    menus,
    menuCategories,
    addons,
    addonCategories,
    locations,
    menusAddonCategories,
    menusMenuCategoriesLocations,
    company,
    tables,
    orders,
    orderlines,
    carts
  ) => {
    return {
      menus,
      menuCategories,
      addons,
      addonCategories,
      menusAddonCategories,
      locations,
      menusMenuCategoriesLocations,
      company,
      tables,
      orders,
      orderlines,
      carts,
    };
  }
);
