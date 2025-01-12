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
            top: { xs: "17%", sm: "30%", lg: "45%" },
            ml: 4,
            color: "white",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: "2em", sm: "3em" },
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
          width: { xs: "90%", md: "100%" },
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
