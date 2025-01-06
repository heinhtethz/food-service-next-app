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
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
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
  const dispatch = useAppDispatch();
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      dispatch(fetchData({ locationId: query.locationId as string }));
    }
  }, [isReady, dispatch, query]);

  return (
    <ThemeProvider theme={theme}>
      <OrderHeader address={address} />
      {children}
    </ThemeProvider>
  );
};

export default OrderAppLayout;
