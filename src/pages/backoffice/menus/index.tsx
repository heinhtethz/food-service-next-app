import React, { useContext, useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { menuByLocationId } from "@/utils";
import Layout from "@/component/Layout";
import CreateMenus from "./CreateMenus";

const Menus = () => {
  const { menus, menusMenuCategoriesLocations } = useAppSelector(appData);
  const [open, setOpen] = useState(false);

  const validMenus = menuByLocationId(menusMenuCategoriesLocations, menus);

  return (
    <Layout title="Menus">
      <Box sx={{ mx: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
            }}
          >
            Create New Menu
          </Button>
        </Box>
        <Box sx={{ display: "flex", ml: 3, flexWrap: "wrap" }}>
          {validMenus.length ? (
            validMenus?.map((menu) => {
              return (
                <Card
                  key={menu.name}
                  sx={{ width: 250, mr: 2, borderRadius: 2, mt: 2 }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="140"
                      image={menu.assetUrl}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {menu.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        variant="inherit"
                        component="div"
                      >
                        {menu.price} Kyats
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })
          ) : (
            <h1>No menu not available here!</h1>
          )}
        </Box>
        <Box>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle sx={{ textAlign: "center" }}>
              Create New Menu
            </DialogTitle>
            <DialogActions>
              <CreateMenus setOpen={setOpen} />
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    </Layout>
  );
};

export default Menus;
