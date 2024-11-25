import { AppBar, Box, Button, Slide, Typography, Zoom } from "@mui/material";
import Restaurant from "../assets/restaurant.png";
import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  return (
    <Box sx={{ width: "100%", margin: "0 auto" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Slide in={true} direction="right" timeout={1000}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontFamily: "monospace",
                maxWidth: 800,
                mt: 20,
              }}
            >
              Manage your menu catelog easily with Food Service.
            </Typography>
          </Slide>
          <Box sx={{ display: "flex", gap: 5, mt: 5 }}>
            <Slide in={true} direction="right" timeout={1000}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#BA0101" }}
                onClick={() => router.push("/order")}
              >
                Order App
              </Button>
            </Slide>
            <Slide in={true} direction="right" timeout={700}>
              <Button
                variant="contained"
                sx={{ bgcolor: "#BA0101" }}
                onClick={() => router.push("/backoffice")}
              >
                Backoffice App
              </Button>
            </Slide>
          </Box>
        </Box>
        <Box>
          <Slide in={true} direction="left" timeout={1000}>
            <Image
              src={Restaurant}
              width={550}
              height={550}
              alt="restaurant-image"
            />
          </Slide>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
