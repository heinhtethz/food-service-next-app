import { MenusAddonCategories } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface MenuAddonCategoryState {
  isLoading: boolean;
  items: MenusAddonCategories[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: MenuAddonCategoryState = {
  isLoading: false,
  items: [],
  error: null,
};

const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setMenusAddonCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCategories } = menusAddonCategoriesSlice.actions;
export default menusAddonCategoriesSlice.reducer;
