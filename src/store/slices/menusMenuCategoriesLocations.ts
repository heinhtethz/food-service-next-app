import { config } from "@/config/config";
import { MenusMenuCategoriesLocations } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const fetchMenusMenuCategoriesLocations = createAsyncThunk(
  "data/fetchMenusMenuCategoriesLocations",
  async (locationId: string, thunkAPI) => {
    thunkAPI.dispatch(setIsLoading(true));
    const response = await fetch(
      `${config.apiBaseUrl}/menusMenuCategoriesLocations?locationId=${locationId}`
    );
    const responseData = await response.json();
    thunkAPI.dispatch(setMenusMenuCategoriesLocations(responseData));
    thunkAPI.dispatch(setIsLoading(false));
  }
);

const menusMenuCategoriesLocationsSlice = createSlice({
  name: "menusMenuCategoriesLocations",
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setMenusMenuCategoriesLocations: (
      state,
      action: PayloadAction<MenusMenuCategoriesLocations[]>
    ) => {
      state.items = action.payload;
    },
  },
});

export const { setMenusMenuCategoriesLocations, setIsLoading } =
  menusMenuCategoriesLocationsSlice.actions;
export default menusMenuCategoriesLocationsSlice.reducer;
