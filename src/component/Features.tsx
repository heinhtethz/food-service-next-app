import { Box, Typography, Zoom } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChecklistRtlIcon from "@mui/icons-material/ChecklistRtl";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";

const Features = () => {
  const features = [
    {
      icon: <RestaurantMenuIcon sx={{ fontSize: "90px", color: "#BA0101" }} />,
      text: "Manage menus",
      delay: "1000ms",
    },
    {
      icon: <QrCode2Icon sx={{ fontSize: "90px", color: "#BA0101" }} />,
      text: "Scan and order",
      delay: "1300ms",
    },
    {
      icon: <LocationOnIcon sx={{ fontSize: "90px", color: "#BA0101" }} />,
      text: "Multiple locations",
      delay: "1500ms",
    },
    {
      icon: <ChecklistRtlIcon sx={{ fontSize: "90px", color: "#BA0101" }} />,
      text: "Subscription",
      delay: "1700ms",
    },
    {
      icon: <SupportAgentIcon sx={{ fontSize: "90px", color: "#BA0101" }} />,
      text: "Customer support",
      delay: "1900ms",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      {features.map((feature) => {
        return (
          <Zoom
            key={feature.text}
            in={true}
            style={{
              transitionDelay: `${feature.delay}`,
              transitionDuration: "1000ms",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              {feature.icon}
              <Typography variant="h6" sx={{ fontFamily: "cursive" }}>
                {feature.text}
              </Typography>
            </Box>
          </Zoom>
        );
      })}
    </Box>
  );
};

export default Features;
