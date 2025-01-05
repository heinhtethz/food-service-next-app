import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import LogoImg from "../assets/pngtree-food-logo.png";
import Image from "next/image";
import { relative } from "path";

const WelcomePageTopBar = () => {
  return (
    <AppBar sx={{ bgcolor: "white", p: 1, width: "100%" }} position="sticky">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            px: 10,
          }}
        >
          <Image src={LogoImg} width={50} height={50} alt="Logo-Image" />
          <Typography
            variant="h4"
            sx={{
              color: "#BA0101",
              fontFamily: "fantasy",
            }}
          >
            Food Service{" "}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default WelcomePageTopBar;
