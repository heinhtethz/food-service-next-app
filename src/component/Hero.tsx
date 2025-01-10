import { Box, Button, Slide, Typography } from "@mui/material";
import Link from "next/link";

const Hero = () => {
  return (
    <Box
      sx={{
        mt: 10,
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            textAlign: "start",
            fontWeight: "bold",
            px: { xs: 2, lg: 5 },
          }}
        >
          Manage your menu catelog easily with Foodie POS and entice your
          customers with QR code ordering system.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;
