import Features from "@/component/Features";
import Footer from "@/component/Footer";
import Header from "@/component/Header";
import Hero from "@/component/Hero";
import Testimonials from "@/component/Testimonials";
import { Box, Typography } from "@mui/material";

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
      <Header />
      <Box
        sx={{
          mt: { lg: -30 },
          position: "relative",
          overflow: "hidden",
          width: "100%",
          "& video": {
            filter: "brightness(0.8)", // Darkens the video
          },
        }}
      >
        <video width="100%" height="auto" muted loop autoPlay>
          <source src="https://bit.ly/3DZqWwo" type="video/mp4" />
        </video>
        <Box
          sx={{
            position: "absolute",
            width: "100%",
            top: { xs: "70%", md: "80%" },
            left: { xs: "10%", md: "15% " },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontSize: { xs: "5vw", md: "4vw" },
              fontWeight: "bold",
              lineHeight: 1,
            }}
          >
            food and drinks <br></br>
            in a tap
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          width: { xs: "90%", md: "100%", lg: "80%" },
          margin: "0 auto",
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
