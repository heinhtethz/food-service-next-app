import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import zIndex from "@mui/material/styles/zIndex";

interface Props {
  window?: () => Window;
}

const Header = ({ window }: Props) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  const [open, setOpen] = useState(false);

  return (
    <>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar sx={{ bgcolor: "white", p: 1 }}>
          <Toolbar>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: "#2D284D",
                  fontFamily: "fantasy",
                }}
              >
                Food Service{" "}
              </Typography>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link href="/order?locationId=1&tableId=1" sx={{ mr: 1 }}>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "primary", borderRadius: 5 }}
                  >
                    Order App
                  </Button>
                </Link>
                <Link>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "primary", borderRadius: 5 }}
                  >
                    Backoffice App
                  </Button>
                </Link>
              </Box>
              <IconButton
                sx={{ display: { xs: "flex", md: "none" } }}
                onClick={() => (open ? setOpen(false) : setOpen(true))}
              >
                {open ? (
                  <CloseIcon color="primary" />
                ) : (
                  <MenuIcon color="primary" />
                )}
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Slide>
      <Drawer open={open} anchor="right" sx={{ zIndex: 0 }}>
        <List
          sx={{
            pt: 15,
            width: "100vw",
            height: "100%",
            bgcolor: "#111111",
          }}
        >
          <ListItem sx={{ pl: 5 }}>
            <Link
              href="/order/locationId=1&tableId=1"
              sx={{ color: "white", fontSize: "large" }}
              underline="none"
            >
              Order App
            </Link>
          </ListItem>
          <ListItem sx={{ pl: 5 }}>
            <Link
              href="/backoffice"
              sx={{ color: "white", fontSize: "large" }}
              underline="none"
            >
              Backoffice App
            </Link>
          </ListItem>
          <ListItem sx={{ pl: 5 }}>
            <Link sx={{ color: "white", fontSize: "large" }} underline="none">
              About
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Header;
