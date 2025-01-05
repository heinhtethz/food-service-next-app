// components/Header.tsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Badge,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoImage from "../assets/pngtree-food-logo.png";

interface Props {
  address?: string;
}

export const OrderHeader = ({ address }: Props) => {
  const { carts } = useAppSelector(appData);
  const router = useRouter();
  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={1}
      sx={{ bgcolor: "white" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex" }}>
          <Image src={LogoImage} alt="logoImage" height={30} width={30} />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Foodie
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
              onClick={() =>
                router.push({ pathname: "/order/cart", query: router.query })
              }
            >
              <Badge badgeContent={carts.length} color="secondary">
                <ShoppingCartIcon color="primary" />
              </Badge>
            </IconButton>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};
