import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import { getSelectedLocationId, menuCategoryByLocationId } from "@/utils";
import Link from "next/link";
import { addMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocations";
import CreateMenuCategory from "./CreateMenuCategory";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const [open, setOpen] = useState(false);

  const validMenuCategories = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  return (
    <Layout title="Menu Categories">
      <Box sx={{ mx: 2, mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new category
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            columnGap: 2,
            flexWrap: "wrap",
            mx: 2,
            mt: 2,
          }}
        >
          {validMenuCategories.length ? (
            validMenuCategories.map((item) => (
              <Link
                href={`/backoffice/menuCategories/${item.id}`}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <DemoPaper
                  square={false}
                  elevation={5}
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  <Typography variant="body2" sx={{ mt: 10 }}>
                    {item.name}
                  </Typography>
                </DemoPaper>
              </Link>
            ))
          ) : (
            <h1>No available menu category!</h1>
          )}
        </Box>
        <CreateMenuCategory open={open} setOpen={setOpen} />
      </Box>
    </Layout>
  );
};

export default MenuCategories;
