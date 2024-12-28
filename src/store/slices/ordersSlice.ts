import { Orders } from "@prisma/client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrderState {
  isLoading: boolean;
  items: Orders[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: OrderState = {
  isLoading: false,
  items: [],
  error: null,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.items = action.payload;
    },
    addOrder: (state, action: PayloadAction<Orders>) => {
      state.items = [...state.items, action.payload];
    },
  },
});

export const { setOrders, addOrder } = orderSlice.actions;
export default orderSlice.reducer;
