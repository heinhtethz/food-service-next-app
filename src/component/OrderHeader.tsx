// components/Header.tsx
import React, { Dispatch, SetStateAction, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
  Tabs,
  Tab,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { useRouter } from "next/router";
import { MenuCategories } from "@prisma/client";

interface Props {
  address?: string;
  setSelectedMenuCategory?: React.Dispatch<
    React.SetStateAction<MenuCategories>
  >;
}

export const OrderHeader: React.FC<Props> = ({
  address,
  setSelectedMenuCategory,
}) => {
  const { carts, menuCategories } = useAppSelector(appData);
  const router = useRouter();
  const pathname = router.pathname;
  const [value, setValue] = useState(0);

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: "white", width: "100%" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Foodies
            </Typography>
          </Box>
          {address && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOnIcon color="primary" />
              <Typography variant="body1">{address}</Typography>
            </Box>
          )}
          {router.pathname === "/order/cart" ? (
            <></>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <IconButton
                onClick={() => {
                  router.push({ pathname: "/order/cart", query: router.query });
                }}
              >
                <Badge badgeContent={carts.length} color="secondary">
                  <ShoppingCartIcon color="primary" />
                </Badge>
              </IconButton>
            </Box>
          )}
        </Box>
        {pathname === "/order" && (
          <Box sx={{ display: "flex" }}>
            <Tabs
              value={value}
              onChange={(evt, value) => setValue(value)}
              variant="scrollable"
              sx={{ width: "100%" }}
              TabIndicatorProps={{
                style: {
                  height: "4px",
                  borderRadius: "2px",
                  backgroundColor: "#717B98",
                },
              }}
            >
              {menuCategories?.map((item) => {
                return (
                  <Tab
                    key={item.id}
                    label={item.name}
                    onClick={() =>
                      setSelectedMenuCategory && setSelectedMenuCategory(item)
                    }
                  />
                );
              })}
            </Tabs>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
