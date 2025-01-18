import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  getSelectedLocationId,
  menuByLocationId,
  menuCategoryByLocationId,
  menusMenuCategoriesLocationsByLocationId,
} from "@/utils";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import AutocompleteComponent from "@/component/Autocomplete";
import { useRouter } from "next/router";
import { MenuCategories } from "@prisma/client";
import {
  removeMenuCategory,
  updateMenuCategory,
} from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocations";
import { FastForward } from "@mui/icons-material";
import SnackbarAction from "@/component/SnackbarAction";

const EditMenuCategory = () => {
  const { menus, menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const selectedLocationId = getSelectedLocationId() as string;
  const id = router.query.id as string;
  const menuCategoryId = Number(id);
  const menuCategory = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  ).find((item) => item.id === menuCategoryId) as MenuCategories;

  const menusByLocation = menuByLocationId(
    menusMenuCategoriesLocations,
    menus
  ).map((item) => ({ id: item.id, name: item.name }));

  const defaultMenuId = menusMenuCategoriesLocationsByLocationId(
    menusMenuCategoriesLocations
  )
    .filter(
      (item) =>
        item.menuCategoryId === Number(menuCategoryId) &&
        item.isArchived === false
    )
    .map((item) => item.menuId);

  const defaultMenus = menusByLocation.filter(
    (item) => defaultMenuId && defaultMenuId.includes(item.id)
  );

  const [updateMenuId, setUpdateMenuId] = useState([] as Number[]);
  const [updateData, setUpdateData] = useState<Partial<MenuCategories>>();
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUpdateMenuCategory = async () => {
    const isValid = updateData?.name;
    if (!isValid) return alert("Pls fill name");
    const response = await fetch(`${config.apiBaseUrl}/menuCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...updateData,
        menuCategoryId: menuCategory?.id,
        menuIds: updateMenuId,
        locationId: Number(selectedLocationId),
      }),
    });
    const responseData = await response.json();
    dispatch(updateMenuCategory(responseData));
    dispatch(fetchMenusMenuCategoriesLocations(selectedLocationId));
    if (response.ok) {
      setSnackbarOpen(true);
    }
  };

  const handleDeleteMenuCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/menuCategories?id=${id}&locationId=${selectedLocationId}`,
      {
        method: "DELETE",
      }
    );
    dispatch(removeMenuCategory(menuCategory));
    setOpen(false);
    if (response.ok) {
      router.push("/backoffice/menuCategories");
    }
  };
  return (
    <Layout title="Edit Menu Category">
      <Box sx={{ width: 400, margin: "0 auto", mt: 2 }}>
        <TextField
          label="Name"
          fullWidth
          defaultValue={menuCategory?.name}
          onChange={(evt) => setUpdateData({ name: evt.target.value })}
        />
        <AutocompleteComponent
          options={menusByLocation}
          defaultValue={defaultMenus}
          label="Menus"
          onChange={(options) =>
            setUpdateMenuId(options.map((item) => item.id))
          }
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button
            variant="contained"
            onClick={() => handleUpdateMenuCategory()}
          >
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Dialog open={open}>
          <DialogContent>
            <Typography variant="h6">
              Are you sure to delete this menu category?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                handleDeleteMenuCategory();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <SnackbarAction
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          message="Updated Menu Category"
        />
      </Box>
    </Layout>
  );
};

export default EditMenuCategory;
