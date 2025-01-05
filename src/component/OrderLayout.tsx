import {
  AppBar,
  Box,
  createTheme,
  CssBaseline,
  Tabs,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

import { OrderHeader } from "./OrderHeader";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchData } from "@/store/slices/appSlice";

interface Props {
  children: ReactNode;
  address?: string;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#f50057", // Foodpanda pink color
    },
    secondary: {
      main: "#000000",
    },
  },
});

const OrderAppLayout = ({ children, address }: Props) => {
  const { isLoading, init } = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!init) {
      dispatch(fetchData());
    }
  }, [dispatch, init]);

  if (isLoading) return null;
  return (
    <ThemeProvider theme={theme}>
      <OrderHeader address={address} />
      {children}
    </ThemeProvider>
  );
};

export default OrderAppLayout;
