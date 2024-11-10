import AutocompleteComponent from "@/component/Autocomplete";
import Layout from "@/component/Layout";
import { config } from "@/config/config";
import { useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { Box, Button, TextField } from "@mui/material";
import { Menus } from "@prisma/client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditAddonCategory = () => {
  const { menus, menusAddonCategories, addonCategories } =
    useAppSelector(appData);
  const addonCategoryId = useParams().id;
  const [menu, setMenu] = useState<Menus[]>();
  const [addonCategory, setAddonCategory] = useState({
    name: "",
    menuIds: [] as Number[],
    addonCategoryId: Number(addonCategoryId),
  });

  const defaultAddonCategoryName = addonCategories
    .filter((item) => item.id === Number(addonCategoryId))
    .map((item) => item.name);

  useEffect(() => {
    if (menus.length) {
      const menuIds = menusAddonCategories
        .filter((item) => item.addonCategoryId === Number(addonCategoryId))
        .map((item) => item.menuId);
      const validMenus = menus.filter((item) => menuIds.includes(item.id));
      setMenu(validMenus);
    }
  }, [menus]);

  const updateAddonCategory = async () => {
    if (!addonCategory.name) return alert("Addon Category Name required");
    await fetch(`${config.apiBaseUrl}/addon-categories`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify(addonCategory),
    });
    fetchData();
  };

  if (!menu?.length) return null;

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
          defaultValue={menu}
          label="menus"
          onChange={(options) =>
            setAddonCategory({
              ...addonCategory,
              menuIds: options.map((item) => item.id),
            })
          }
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" onClick={updateAddonCategory}>
            Update
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditAddonCategory;
