import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { AddonCategories, Addons } from "@prisma/client";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import AutocompleteComponent from "@/component/Autocomplete";
import { useRouter } from "next/router";
import SingleValueAutocomplete from "@/component/SingleValueAutocomplete";
import { addonCategoryByLocationId } from "@/utils";
import { removeAddon, updateAddon } from "@/store/slices/addonsSlice";
import { apiBaseUrl } from "next-auth/client/_utils";

const EditAddon = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { addons, addonCategories } = useAppSelector(appData);
  const addonId = router.query.id as string;
  const currentAddonId = Number(addonId);
  const addon = addons.find((item) => item.id === currentAddonId) as Addons;
  const [updateAddonData, setUpdateAddonData] = useState({
    name: "",
    price: 0,
    addonCategoryId: [] as number[],
  });
  const [open, setOpen] = useState(false);

  const defaultAddon = addons.filter((item) => item.id === currentAddonId);
  const defaultAddonName = defaultAddon.map((item) => item.name);
  const defaultAddonPrice = defaultAddon.map((item) => item.price);

  const defaultAddonCategoryId = defaultAddon.map(
    (item) => item.addonCategoryId
  );
  const defaultAddonCategory = addonCategories
    .map((item) => ({ id: item.id, name: item.name }))
    .find((item) => defaultAddonCategoryId.includes(item.id));

  const handleUpdateAddon = async () => {
    if (!updateAddonData.name || !updateAddonData.price)
      return alert("Name or price is required");
    const response = await fetch(`${config.apiBaseUrl}/addons`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updateAddonData, addonId: currentAddonId }),
    });
    const responseData = await response.json();
    dispatch(updateAddon(responseData));
  };

  const handleDeleteAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons?id=${addonId}`, {
      method: "DELETE",
    });
    dispatch(removeAddon(addon));
    router.push("/backoffice/addons");
  };

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
            setUpdateAddonData({ ...updateAddonData, name: evt.target.value })
          }
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          defaultValue={defaultAddonPrice}
          onChange={(evt) =>
            setUpdateAddonData({
              ...updateAddonData,
              price: Number(evt.target.value),
            })
          }
          fullWidth
        />
        <Box sx={{ mt: 2 }}>
          <SingleValueAutocomplete
            defaultValue={defaultAddonCategory}
            options={addonCategories}
            label="Addon Category"
            onChange={(option) =>
              setUpdateAddonData({
                ...updateAddonData,
                addonCategoryId: [option?.id] as number[],
              })
            }
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="contained" onClick={handleUpdateAddon}>
            UPDATE
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
              Are you sure to delete this addon?
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
                handleDeleteAddon();
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

export default EditAddon;
