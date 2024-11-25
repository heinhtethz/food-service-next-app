import { AppBar, Box, Typography } from "@mui/material";
import LogoImg from "../assets/pngtree-food-logo.png";
import Image from "next/image";

const WelcomePageTopBar = () => {
  return (
    <AppBar sx={{ bgcolor: "white", p: 1 }} elevation={1}>
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
    </AppBar>
  );
};

export default WelcomePageTopBar;
