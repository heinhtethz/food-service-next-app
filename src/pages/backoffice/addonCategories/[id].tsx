import AutocompleteComponent from "@/component/Autocomplete";
import Layout from "@/component/Layout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeAddonCategory,
  updateddonCategory,
} from "@/store/slices/addonCategoriesSlice";
import { appData, fetchData } from "@/store/slices/appSlice";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { AddonCategories, Menus } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const EditAddonCategory = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { menus, menusAddonCategories, addonCategories } =
    useAppSelector(appData);
  const addonCategoryId = router.query.id as string;
  const addonCategoryData = addonCategories.find(
    (item) => item.id === Number(addonCategoryId)
  ) as AddonCategories;
  const [addonCategory, setAddonCategory] = useState({
    name: "",
    menuIds: [] as Number[],
    addonCategoryId: Number(addonCategoryId),
  });
  const [open, setOpen] = useState(false);

  const defaultAddonCategoryName = addonCategories
    .filter((item) => item.id === Number(addonCategoryId))
    .map((item) => item.name);

  const menuIds = menusAddonCategories
    .filter(
      (item) =>
        item.addonCategoryId === Number(addonCategoryId) &&
        item.isArchived === false
    )
    .map((item) => item.menuId);
  const defaultMenus = menus.filter((item) => menuIds.includes(item.id));

  const hundleUpdateAddonCategory = async () => {
    if (!addonCategory.name) return alert("Addon Category Name required");
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...addonCategory,
        addonCategoryId: Number(addonCategoryId),
      }),
    });
    const responseData = await response.json();
    dispatch(updateddonCategory(responseData));
    dispatch(fetchMenusAddonCategories(addonCategory.menuIds));
  };

  const handleDeleteAddonCategory = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/addonCategories?id=${addonCategoryId}`,
      {
        method: "DELETE",
      }
    );
    dispatch(removeAddonCategory(addonCategoryData));
    setOpen(false);
    response.ok && router.push("/backoffice/addonCategories");
  };

  return (
    <Layout title="Edit Addon Category">
      <Box sx={{ mx: 3, mt: 5, width: 500 }}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          defaultValue={defaultAddonCategoryName}
          onChange={(evt) =>
            setAddonCategory({ ...addonCategory, name: evt.target.value })
          }
        />
        <AutocompleteComponent
          options={menus}
          defaultValue={defaultMenus}
          label="menus"
          onChange={(options) =>
            setAddonCategory({
              ...addonCategory,
              menuIds: options.map((item) => item.id),
            })
          }
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" onClick={hundleUpdateAddonCategory}>
            Update
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Dialog open={open}>
          <DialogContent>
            <Typography variant="h6">
              Are you sure to delete this addon category?
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
                handleDeleteAddonCategory();
              }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Layout>
  );
};

export default EditAddonCategory;
