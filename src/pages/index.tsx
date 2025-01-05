import Features from "@/component/Features";
import Header from "@/component/Header";
import WelcomePageTopBar from "@/component/welcomePageTopBar";
import { Box } from "@mui/material";

const FoodServiceApp = () => {
  return (
    <Box sx={{ bgcolor: "#f4ece2" }}>
      <WelcomePageTopBar />
      <Box
        sx={{
          mx: 10,
          maxWidth: { md: "100%", lg: "1500px" },
          height: "100vh",
        }}
      >
        <Header />
        <Features />
      </Box>
    </Box>
  );
};

export default FoodServiceApp;
