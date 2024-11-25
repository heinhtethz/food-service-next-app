import { Menus } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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
    addMenu: (state, action: PayloadAction<Menus>) => {
      state.items = [...state.items, action.payload];
    },
    updateMenu: (state, action: PayloadAction<Menus>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeMenu: (state, action: PayloadAction<Menus>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setMenus, addMenu, updateMenu, removeMenu } = menusSlice.actions;
export default menusSlice.reducer;
