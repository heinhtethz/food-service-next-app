import { MenusAddonCategories, Tables } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface TableState {
  isLoading: boolean;
  items: Tables[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: TableState = {
  isLoading: false,
  items: [],
  error: null,
};

const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    setTables: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setTables } = tablesSlice.actions;
export default tablesSlice.reducer;
