import { Orderlines, Orders } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderlinesState {
  isLoading: boolean;
  items: Orderlines[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: OrderlinesState = {
  isLoading: false,
  items: [],
  error: null,
};

const orderlinesSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrderlines: (state, action) => {
      state.items = action.payload;
    },
    updateOrderline: (state, action: PayloadAction<Orderlines>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setOrderlines, updateOrderline } = orderlinesSlice.actions;
export default orderlinesSlice.reducer;
