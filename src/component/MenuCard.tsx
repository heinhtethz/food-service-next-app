import { Add } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menus } from "@prisma/client";
import Link from "next/link";
import Image from "../../public/next.svg";

interface Props {
  menu: Menus;
  href: string | object;
}

const MenuCard = ({ menu, href }: Props) => {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        marginBottom: "15px",
        padding: 0,
        cursor: "pointer",
      }}
    >
      <Card
        sx={{
          width: { xs: "90vw", sm: "43vw", md: "28vw", lg: 250 },
          height: "auto",
        }}
        elevation={3}
      >
        <CardMedia
          sx={{
            height: { xs: 150, md: 120 },
            backgroundSize: "contained",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)", // Slight size increase
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)", // Add shadow on hover
            },
          }}
          image={menu.assetUrl || ""}
          component={"div"}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ fontWeight: "bold" }}
          >
            {menu.name}
          </Typography>
          <Typography gutterBottom variant="caption">
            {menu.price} kyats
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
