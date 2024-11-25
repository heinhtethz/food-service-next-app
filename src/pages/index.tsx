import Features from "@/component/Features";
import Header from "@/component/Header";
import WelcomePageTopBar from "@/component/welcomePageTopBar";
import { Box } from "@mui/material";

const FoodServiceApp = () => {
  return (
    <Box>
      <WelcomePageTopBar />
      <Box sx={{ mx: 10, maxWidth: { md: "100%", lg: "1440px" }, mt: 5 }}>
        <Header />
        <Features />
      </Box>
    </Box>
  );
};

export default FoodServiceApp;
