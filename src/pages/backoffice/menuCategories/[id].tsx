import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getSelectedLocationId,
  menuByLocationId,
  menusMenuCategoriesLocationsByLocationId,
} from "@/utils";
import { useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import AutocompleteComponent from "@/component/Autocomplete";
import { useRouter } from "next/router";

const EditMenuCategory = () => {
  const router = useRouter();
  const menuCategoryId = router.query.id as string;
  const selectedLocationId = getSelectedLocationId();
  const { menus, menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const menusByLocation = menuByLocationId(
    menusMenuCategoriesLocations,
    menus
  ).map((item) => ({ id: item.id, name: item.name }));

  const defaultMenuId = menusMenuCategoriesLocationsByLocationId(
    menusMenuCategoriesLocations
  )
    .filter((item) => item.menuCategoryId === Number(menuCategoryId))
    .map((item) => item.menuId);

  const defaultMenus = menusByLocation.filter(
    (item) => defaultMenuId && defaultMenuId.includes(item.id)
  );

  const selectedMenuCategoryName = menuCategories
    .filter((item) => item.id === Number(menuCategoryId))
    .map((item) => item.name)
    .toString();

  const [checked, setChecked] = useState(true);
  const [updateData, setUpdateData] = useState({
    name: "",
    menus_id: [] as number[],
    is_available: checked,
    menu_categories_id: Number(menuCategoryId),
    locations_id: Number(selectedLocationId),
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const updateMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(updateData),
    });

    fetchData();
  };
  return (
    <Layout title="Edit Menu Category">
      <Box sx={{ width: 400, margin: "0 auto", mt: 2 }}>
        <TextField
          label="Name"
          fullWidth
          defaultValue={selectedMenuCategoryName}
          onChange={(evt) =>
            setUpdateData({ ...updateData, name: evt.target.value })
          }
        />
        <AutocompleteComponent
          options={menus}
          defaultValue={defaultMenus}
          label="Menus"
          onChange={(options) =>
            setUpdateData({
              ...updateData,
              menus_id: options.map((item) => item.id),
            })
          }
        />
        <Box sx={{ mt: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="*Required"
          ></FormControlLabel>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained" onClick={() => updateMenuCategory()}>
            Update
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditMenuCategory;
