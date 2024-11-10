import { Company } from "@prisma/client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface CompanyState {
  isLoading: boolean;
  item: Company | null;
  error: Error | null;
}

// Define the initial state using that type
const initialState: CompanyState = {
  isLoading: false,
  item: null,
  error: null,
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
