import { MenuCategories } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

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
  },
});

export const { setMenuCategories } = menuCategoriesSlice.actions;
export default menuCategoriesSlice.reducer;
