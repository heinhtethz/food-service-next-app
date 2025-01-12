import { Avatar, Box, Button, Paper, Slide, Typography } from "@mui/material";
import Image from "next/image";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useRef } from "react";

const testimonials = [
  {
    name: "Tom",
    company: "Tasty Foods Co. Ltd",
    avatar: "/pic1.jpeg",
    description: `We increased our sale by 120% during the first 3 months of using Foodie POS. Easy and simple to use. 
      Super duper recommended for everyone who are less tech savy. 5/5`,
  },
  {
    name: "Hailey,",
    company: "Waa T Co. Ltd",
    avatar: "/pic2.jpeg",
    description: `Our customers love Foodie POS. Quick and easy with QR code ordering. We now spend more time taking 
      care of our customers instead of taking orders manually. Thanks to Foodie POS!`,
  },
  {
    name: "Zen",
    company: "Swey Mel Co. Ltd",
    avatar: "/pic3.jpeg",
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. 
    Foodie POS customer service is a top-notch! They are always there when we need help. 5 starsss!`,
  },
  {
    name: "Zen",
    company: "Swey Mel Co. Ltd",
    avatar: "/pic3.jpeg",
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. 
    Foodie POS customer service is a top-notch! They are always there when we need help. 5 starsss!`,
  },
  {
    name: "Zen",
    company: "Swey Mel Co. Ltd",
    avatar: "/pic3.jpeg",
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. 
    Foodie POS customer service is a top-notch! They are always there when we need help. 5 starsss!`,
  },
  {
    name: "Zen",
    company: "Swey Mel Co. Ltd",
    avatar: "/pic3.jpeg",
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. 
    Foodie POS customer service is a top-notch! They are always there when we need help. 5 starsss!`,
  },
  {
    name: "Zen",
    company: "Swey Mel Co. Ltd",
    avatar: "/pic3.jpeg",
    description: `Integrated system. Easy to use. Very satisfied. Highly recommended for everyone. 
    Foodie POS customer service is a top-notch! They are always there when we need help. 5 starsss!`,
  },
];

const Testimonials = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: string) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300; // Adjust scroll amount as needed
      if (direction === "left") {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        width: "100%",
      }}
    >
      <Button
        onClick={() => handleScroll("left")}
        sx={{ display: { xs: "none", md: "flex" } }}
      >
        <ArrowBackIosNewIcon />
      </Button>
      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          overflowX: "scroll",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          gap: "16px",
        }}
      >
        {testimonials.map((item) => {
          return (
            <Paper
              key={item.name}
              sx={{
                minWidth: 250,
                height: "auto",
                p: 2,
                mb: 3,
                borderRadius: 3,
                position: "relative",
                bgcolor: "#2E294E",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Avatar alt={item.name} sx={{ mr: 2 }}>
                  <Image src={item.avatar} alt={item.name} fill />
                </Avatar>
                <Box>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontStyle: "italic",
                      color: "#E8F6EF",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontStyle: "italic",
                      color: "#E8F6EF",
                    }}
                  >
                    {item.company}
                  </Typography>
                </Box>
              </Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "16px", color: "#E8F6EF" }}
              >
                {item.description}
              </Typography>
            </Paper>
          );
        })}
      </Box>
      <Button sx={{ display: { xs: "none", md: "flex" } }}>
        <ArrowForwardIosIcon onClick={() => handleScroll("right")} />
      </Button>
    </Box>
  );
};

export default Testimonials;
