import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import { addonCategoryByLocationId } from "@/utils";
import { useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { config } from "@/config/config";
import AutocompleteComponent from "@/component/Autocomplete";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
}

const CreateNewAddons = ({ setOpen, open }: Props) => {
  const {
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menusAddonCategories,
  } = useAppSelector(appData);

  const [addonData, setAddonData] = useState({
    name: "",
    price: 0,
    addonCategoryIds: [] as number[],
  });

  const validAddonCategories = addonCategoryByLocationId(
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menusAddonCategories
  );

  const mappedValidAddonCategory = validAddonCategories.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  const createNewAddon = async () => {
    await fetch(`${config.apiBaseUrl}/addons`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(addonData),
    });

    fetchData();

    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
      <DialogTitle>Create New Addon</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            placeholder="Name"
            variant="outlined"
            sx={{ mb: 2 }}
            onChange={(evt) =>
              setAddonData({ ...addonData, name: evt.target.value })
            }
            fullWidth
          />
          <TextField
            placeholder="Price"
            type="number"
            variant="outlined"
            onChange={(evt) =>
              setAddonData({
                ...addonData,
                price: Number(evt.target.value),
              })
            }
            fullWidth
          />
          <AutocompleteComponent
            key={mappedValidAddonCategory[0]?.id}
            options={mappedValidAddonCategory}
            label="Addon Category"
            onChange={(options) => {
              setAddonData({
                ...addonData,
                addonCategoryIds: options.map((item) => item.id),
              });
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button variant="contained" onClick={createNewAddon}>
              Create
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewAddons;
