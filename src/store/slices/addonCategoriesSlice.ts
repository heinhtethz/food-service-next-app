import { AddonCategories } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AddonCategoryState {
  isLoading: boolean;
  items: AddonCategories[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: AddonCategoryState = {
  isLoading: false,
  items: [],
  error: null,
};

const addonCategoriesSlice = createSlice({
  name: "addonCategories",
  initialState,
  reducers: {
    setAddonCategories: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setAddonCategories } = addonCategoriesSlice.actions;
export default addonCategoriesSlice.reducer;
