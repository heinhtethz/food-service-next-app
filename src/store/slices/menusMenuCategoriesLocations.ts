import { MenusMenuCategoriesLocations } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface MenuMenuCategoryLocaionState {
  isLoading: boolean;
  items: MenusMenuCategoriesLocations[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: MenuMenuCategoryLocaionState = {
  isLoading: false,
  items: [],
  error: null,
};

const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setMenusMenuCategoriesLocations: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusMenuCategoriesLocations } =
  menusMenuCategoriesLocationsSlice.actions;
export default menusMenuCategoriesLocationsSlice.reducer;
