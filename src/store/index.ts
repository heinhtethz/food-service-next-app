import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counterSlice";
import menusSlice from "./slices/menusSlice";
import appSlice from "./slices/appSlice";
import menuCategoriesSlice from "./slices/menuCategoriesSlice";
import addonsSlice from "./slices/addonsSlice";
import addonCategoriesSlice from "./slices/addonCategoriesSlice";
import menusAddonCategoriesSlice from "./slices/menusAddonCategoriesSlice";
import locationsSlice from "./slices/locationsSlice";
import tablesSlice from "./slices/tablesSlice";
import companySlice from "./slices/companySlice";
import menusMenuCategoriesLocationsSlice from "./slices/menusMenuCategoriesLocations";

// ...

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    app: appSlice,
    menus: menusSlice,
    menuCategories: menuCategoriesSlice,
    addons: addonsSlice,
    addonCategories: addonCategoriesSlice,
    menusAddonCategories: menusAddonCategoriesSlice,
    locations: locationsSlice,
    menusMenuCategoriesLocations: menusMenuCategoriesLocationsSlice,
    company: companySlice,
    tables: tablesSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
