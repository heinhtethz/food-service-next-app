import { Addons } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    setAddons: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setAddons } = addonsSlice.actions;
export default addonsSlice.reducer;
