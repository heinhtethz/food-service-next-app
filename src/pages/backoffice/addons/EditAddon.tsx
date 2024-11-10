import { Box, Button, TextField } from "@mui/material";

import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { AddonCategories } from "@prisma/client";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import AutocompleteComponent from "@/component/Autocomplete";

const EditAddon = () => {
  const addonId = useParams().id;
  const currentAddonId = Number(addonId);
  const { addons, addonCategories } = useAppSelector(appData);
  const [addonCategory, setAddonCategory] = useState<AddonCategories[]>();
  const [updateAddon, setUpdateAddon] = useState({
    name: "",
    price: 0,
    addon_categories_id: [] as number[],
    addonId: currentAddonId,
  });

  const defaultAddon = addons.filter((item) => item.id === currentAddonId);
  const defaultAddonName = defaultAddon.map((item) => item.name);
  const defaultAddonPrice = defaultAddon.map((item) => item.price);

  const updateAddonData = async () => {
    if (!updateAddon.name || !updateAddon.price)
      return alert("Name or price is required");
    await fetch(`${config.apiBaseUrl}/addons`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer `,
      },
      body: JSON.stringify(updateAddon),
    });
    fetchData();
  };

  useEffect(() => {
    if (addonCategories.length) {
      const validAddonCategoryId = defaultAddon.map(
        (item) => item.addonCategoryId
      );
      const validAddonCategory = addonCategories.filter((item) =>
        validAddonCategoryId.includes(item.id)
      );
      setAddonCategory(validAddonCategory);
    }
  }, [addonCategories]);

  if (!addonCategory?.length) return null;
  return (
    <Layout title="Edit Addon">
      <Box
        sx={{
          width: 500,
          margin: "0 auto",
          mt: 5,
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          sx={{ mb: 2 }}
          defaultValue={defaultAddonName}
          onChange={(evt) =>
            setUpdateAddon({ ...updateAddon, name: evt.target.value })
          }
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          defaultValue={defaultAddonPrice}
          onChange={(evt) =>
            setUpdateAddon({ ...updateAddon, price: Number(evt.target.value) })
          }
          fullWidth
        />
        <AutocompleteComponent
          defaultValue={addonCategory}
          options={addonCategories}
          label="Addon Category"
          onChange={(option) =>
            setUpdateAddon({
              ...updateAddon,
              addon_categories_id: option.map((item) => item.id),
            })
          }
        />
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button variant="contained" onClick={updateAddonData}>
            UPDATE
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditAddon;
