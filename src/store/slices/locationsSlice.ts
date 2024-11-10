import { Locations } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
    setLocations: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setLocations } = locationsSlice.actions;
export default locationsSlice.reducer;
