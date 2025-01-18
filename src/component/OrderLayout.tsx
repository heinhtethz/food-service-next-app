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
import Footer from "./Footer";
import { MenuCategories } from "@prisma/client";

interface Props {
  children: ReactNode;
  address?: string;
  setSelectedMenuCategory?: React.Dispatch<
    React.SetStateAction<MenuCategories>
  >;
}

const OrderAppLayout: React.FC<Props> = ({
  children,
  address,
  setSelectedMenuCategory,
}) => {
  const dispatch = useAppDispatch();
  const { query, isReady } = useRouter();

  useEffect(() => {
    if (isReady) {
      dispatch(fetchData({ locationId: query.locationId as string }));
    }
  }, [isReady, dispatch, query]);

  return (
    <Box>
      <OrderHeader
        address={address}
        setSelectedMenuCategory={setSelectedMenuCategory}
      />
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {children}
        <Footer />
      </Box>
    </Box>
  );
};

export default OrderAppLayout;
