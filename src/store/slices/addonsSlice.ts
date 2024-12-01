import { Addons } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface addonState {
  isLoading: boolean;
  items: Addons[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: addonState = {
  isLoading: false,
  items: [],
  error: null,
};

const addonsSlice = createSlice({
  name: "addons",
  initialState,
  reducers: {
    setAddons: (state, action: PayloadAction<Addons[]>) => {
      state.items = action.payload;
    },
    addAddon: (state, action: PayloadAction<Addons>) => {
      state.items = [...state.items, action.payload];
    },
    updateAddon: (state, action: PayloadAction<Addons>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeAddon: (state, action: PayloadAction<Addons>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setAddons, addAddon, updateAddon, removeAddon } =
  addonsSlice.actions;
export default addonsSlice.reducer;
