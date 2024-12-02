import { Tables } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    setTables: (state, action: PayloadAction<Tables[]>) => {
      state.items = action.payload;
    },
    updateTable: (state, action: PayloadAction<Tables>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    addTable: (state, action: PayloadAction<Tables>) => {
      state.items = [...state.items, action.payload];
    },
    removeTable: (state, action: PayloadAction<Tables>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { setTables, updateTable, addTable, removeTable } =
  tablesSlice.actions;
export default tablesSlice.reducer;
