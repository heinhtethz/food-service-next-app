import Features from "@/component/Features";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Hero from "@/component/Hero";
import Testimonials from "@/component/Testimonials";
import WelcomePageTopBar from "@/component/welcomePageTopBar";
import { Box } from "@mui/material";

const FoodiePOS = () => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        flexDirection: "column",
      }}
    >
      <WelcomePageTopBar />
      <Box sx={{ mt: { xs: "none", lg: -20 }, width: "100%" }}>
        <video width="100%" height="auto" muted loop autoPlay>
          <source src="https://bit.ly/3DZqWwo" type="video/mp4" />
        </video>
      </Box>
      <Box
        sx={{
          maxWidth: { md: "100%", lg: "1280px" },
          m: "0 auto",
          px: { xs: 2, md: 5 },
        }}
      >
        <Hero />
        <Features />
        <Testimonials />
      </Box>
      <Footer />
    </Box>
  );
};

export default FoodiePOS;
