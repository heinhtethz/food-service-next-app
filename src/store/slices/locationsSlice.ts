import { Locations } from "@prisma/client";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface LocationState {
  isLoading: boolean;
  items: Locations[];
  error: Error | null;
}

// Define the initial state using that type
const initialState: LocationState = {
  isLoading: false,
  items: [],
  error: null,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<Locations[]>) => {
      state.items = action.payload;
    },
    addLocation: (state, action: PayloadAction<Locations>) => {
      state.items = [...state.items, action.payload];
    },
    removeLocation: (state, action: PayloadAction<Locations>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
    updateLocation: (state, action: PayloadAction<Locations>) => {
      state.items = state.items.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
  },
});

export const { setLocations, addLocation, removeLocation, updateLocation } =
  locationsSlice.actions;
export default locationsSlice.reducer;
