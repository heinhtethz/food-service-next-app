import { Add } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Menus } from "@prisma/client";
import Link from "next/link";

interface Props {
  menu: Menus;
  href: string | object;
}

const MenuCard = ({ menu, href }: Props) => {
  return (
    <Link
      key={menu.id}
      href={href}
      style={{
        textDecoration: "none",
        marginBottom: "15px",
      }}
    >
      <Card sx={{ width: { xs: 375, md: 210 }, height: "auto" }} elevation={5}>
        <CardMedia
          sx={{ height: { xs: 150, md: 120 }, backgroundSize: "contained" }}
          image={menu.assetUrl || ""}
          component={"div"}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ textAlign: "center" }}
          >
            {menu.name}
          </Typography>
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{ textAlign: "center" }}
          >
            {menu.price} kyats
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MenuCard;
