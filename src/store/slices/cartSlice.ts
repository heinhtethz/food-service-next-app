import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/typings";

interface cartState {
  isLoading: boolean;
  items: CartItem[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: cartState = {
  isLoading: false,
  items: [],
  error: null,
};

const cartSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, action) => (state.items = action.payload),
    updateCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    addCart: (state, action: PayloadAction<CartItem>) => {
      state.items = [...state.items, action.payload];
    },
    removeCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    removeallCartItem: (state) => {
      state.items = [];
    },
  },
});

export const { setCarts, updateCart, addCart, removeCart, removeallCartItem } =
  cartSlice.actions;
export default cartSlice.reducer;
