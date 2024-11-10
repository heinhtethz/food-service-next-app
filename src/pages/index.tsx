import Layout from "@/component/Layout";
import { Box, ImageList, Typography } from "@mui/material";

const FoodServiceApp = () => {
  return (
    <Layout>
      <Typography
        variant="h4"
        sx={{ display: "flex", justifyContent: "center", mt: 2 }}
      >
        Food Service App{" "}
      </Typography>
    </Layout>
  );
};

export default FoodServiceApp;
