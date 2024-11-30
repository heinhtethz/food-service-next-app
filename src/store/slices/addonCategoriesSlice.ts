import { AddonCategories } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setAddonCategories: (state, action: PayloadAction<AddonCategories[]>) => {
      state.items = action.payload;
    },
    updateddonCategory: (state, action: PayloadAction<AddonCategories>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddonCategory: (state, action: PayloadAction<AddonCategories>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    addAddonCategory: (state, action: PayloadAction<AddonCategories>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const {
  setAddonCategories,
  updateddonCategory,
  removeAddonCategory,
  addAddonCategory,
} = addonCategoriesSlice.actions;
export default addonCategoriesSlice.reducer;
