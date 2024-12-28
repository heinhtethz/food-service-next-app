import Features from "@/component/Features";
import Header from "@/component/Header";
import WelcomePageTopBar from "@/component/welcomePageTopBar";
import { Box } from "@mui/material";
import Image from "next/image";

const FoodServiceApp = () => {
  return (
    <Box>
      <WelcomePageTopBar />
      <Box sx={{ bgcolor: "#F4ECE2" }}>
        <Box
          sx={{
            mx: 10,
            maxWidth: { md: "100%", lg: "1440px" },
            mt: 5,
          }}
        >
          <Header />
          <Features />
        </Box>
      </Box>
    </Box>
  );
};

export default FoodServiceApp;
