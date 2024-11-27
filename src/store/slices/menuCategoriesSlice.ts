import { MenuCategories } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
import { updateMenu } from "./menusSlice";

interface MenuCategoryState {
  isLoading: boolean;
  items: MenuCategories[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: MenuCategoryState = {
  isLoading: false,
  items: [],
  error: null,
};

const menuCategoriesSlice = createSlice({
  name: "menuCategories",
  initialState,
  reducers: {
    setMenuCategories: (state, action) => {
      state.items = action.payload;
    },
    updateMenuCategory: (state, action: PayloadAction<MenuCategories>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    addMenuCategory: (state, action: PayloadAction<MenuCategories>) => {
      state.items = [...state.items, action.payload];
    },
    removeMenuCategory: (state, action: PayloadAction<MenuCategories>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const {
  setMenuCategories,
  updateMenuCategory,
  addMenuCategory,
  removeMenuCategory,
} = menuCategoriesSlice.actions;
export default menuCategoriesSlice.reducer;
