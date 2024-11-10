import { Menus } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface MenuState {
  isLoading: boolean;
  items: Menus[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: MenuState = {
  isLoading: false,
  items: [],
  error: null,
};

const menusSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    setMenus: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setMenus } = menusSlice.actions;
export default menusSlice.reducer;
