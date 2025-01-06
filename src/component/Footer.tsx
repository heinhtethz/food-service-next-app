import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import logoImage from "../assets/pngtree-food-logo.png";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 150,
        bgcolor: "#4C4C6D",
        px: "12px",
      }}
    >
      <Box
        sx={{
          maxWidth: 1280,
          m: "0 auto",
          display: "flex",
          height: "100%",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
              42 Street <br />
              Botahtaung, Yangon <br />
              heinhtetzaw0006@gmail.com
              <br />
              +959 663962244
            </Typography>
          </Box>
          <Box>
            <Link
              href={"/order?locationId=1&tableId=1"}
              style={{ textDecoration: "none" }}
            >
              <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
                Order app
              </Typography>
            </Link>
            <Link href={"/backoffice"} style={{ textDecoration: "none" }}>
              <Typography sx={{ color: "#E8F6EF", fontStyle: "italic" }}>
                Backoffice
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
