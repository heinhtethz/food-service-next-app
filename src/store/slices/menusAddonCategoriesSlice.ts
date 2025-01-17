import { config } from "@/config/config";
import { MenusAddonCategories } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchMenusAddonCategories = createAsyncThunk(
  "data/fetchMenusAddonCategories",
  async (menuIds: Number[], thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusAddonCategories?menuIds=${menuIds?.join(",")}`
    );
    const responseData = await response.json();
    thunkAPI.dispatch(setMenusAddonCategories(responseData));
    thunkAPI.dispatch(setIsLoading(false));
  }
);

const menusAddonCategoriesSlice = createSlice({
  name: "menusAddonCategories",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMenusAddonCategories: (
      state,
      action: PayloadAction<MenusAddonCategories[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusAddonCategories, setIsLoading } =
  menusAddonCategoriesSlice.actions;
export default menusAddonCategoriesSlice.reducer;
