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
  const dispatch = useAppDispatch();
  const selectedLocationId = getSelectedLocationId() as string;
  const [open, setOpen] = useState(false);
  const [menuCategoryName, setMenuCategoryName] = useState("");
  const [checked, setChecked] = useState(true);

  const validMenuCategories = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  const createMenuCategory = async () => {
    if (!menuCategoryName) return alert("Name is required...");
    const response = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: menuCategoryName,
        locationId: Number(selectedLocationId),
      }),
    });
    const responseData = await response.json();
    dispatch(addMenuCategory(responseData));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    setOpen(false);
  };

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

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create New Menu Category</DialogTitle>
          <DialogContent>
            <form onSubmit={createMenuCategory}>
              <TextField
                placeholder="Name"
                variant="outlined"
                fullWidth
                onChange={(evt) => {
                  setMenuCategoryName(evt.target.value);
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={createMenuCategory}
                >
                  Create
                </Button>
              </Box>
            </form>
          </DialogContent>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default MenuCategories;
