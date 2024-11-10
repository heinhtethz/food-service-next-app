import {
  createAsyncThunk,
  createSelector,
  createSlice,
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

interface CounterState {
  isLoading: boolean;
  error: Error | null;
}

// Define the initial state using that type
const initialState: CounterState = {
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "data/fetchData",
  async (locationId, thunkAPI) => {
    thunkAPI.dispatch(setAppLoading(true));
    const response = await fetch(`${config.apiBaseUrl}/api/app`);
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
    thunkAPI.dispatch(setAppLoading(false));
  }
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setAppLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAppLoading } = appSlice.actions;

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
    tables
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
    };
  }
);

export default appSlice.reducer;
