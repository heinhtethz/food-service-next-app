import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import ClassIcon from "@mui/icons-material/Class";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import CategoryIcon from "@mui/icons-material/Category";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface Props {
  title?: string;
}

const NavBar = ({ title }: Props) => {
  const { data } = useSession();
  const [open, setOpen] = useState(false);

  const sidebarMenuItems = [
    { id: 1, label: "Orders", icon: <LocalMallIcon />, route: "/orders" },
    {
      id: 2,
      label: "Menu Categories",
      icon: <CategoryIcon />,
      route: "/backoffice/menuCategories",
    },
    {
      id: 3,
      label: "Menus",
      icon: <LocalDiningIcon />,
      route: "/backoffice/menus",
    },
    {
      id: 4,
      label: "Addon Categories",
      icon: <ClassIcon />,
      route: "/backoffice/addonCategories",
    },
    {
      id: 5,
      label: "Addons",
      icon: <LunchDiningIcon />,
      route: "/backoffice/addons",
    },

    {
      id: 6,
      label: "Tables",
      icon: <TableRestaurantIcon />,
      route: "/backoffice/tables",
    },
    {
      id: 7,
      label: "Locations",
      icon: <LocationOnIcon />,
      route: "/backoffice/locations",
    },
    {
      id: 8,
      label: "Settings",
      icon: <SettingsIcon />,
      route: "/backoffice/settings",
    },
  ];

  const menuLists = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setOpen(false)}
      onKeyDown={() => setOpen(false)}
    >
      <List>
        {sidebarMenuItems.slice(0, 7).map((menuItem) => (
          <Link
            href={menuItem.route}
            key={menuItem.id}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {sidebarMenuItems.slice(-1).map((menuItem) => (
          <Link
            href={menuItem.route}
            key={menuItem.id}
            style={{ textDecoration: "none", color: "#313131" }}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{menuItem.icon}</ListItemIcon>
                <ListItemText primary={menuItem.label} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {data ? (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => setOpen(true)}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <span></span>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {title ? `Food Service Pos - ${title}` : `Food Service Pos`}
          </Typography>
          {data ? (
            <Button
              color="inherit"
              onClick={() => {
                signOut({ callbackUrl: "/auth/signin" });
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                signIn("google", { callbackUrl: "/backoffice" });
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer open={open} onClose={() => setOpen(false)}>
          {menuLists()}
        </Drawer>
      </Box>
    </Box>
  );
};

export default NavBar;