import AutocompleteComponent from "@/component/Autocomplete";
import { config } from "@/config/config";
import { AppDispatch } from "@/store";
import { useAppSelector } from "@/store/hooks";
import { addAddonCategory } from "@/store/slices/addonCategoriesSlice";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusAddonCategories } from "@/store/slices/menusAddonCategoriesSlice";
import { menuByLocationId } from "@/utils";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from "@mui/material";
import { Menus } from "@prisma/client";
import { useState } from "react";
import { useDispatch } from "react-redux";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const CreateAddonCategory = ({ open, setOpen }: Props) => {
  const { menusMenuCategoriesLocations, menus } = useAppSelector(appData);
  const dispatch = useDispatch<AppDispatch>();
  const [checked, setChecked] = useState(true);
  const [addonCategory, setAddonCategory] = useState({
    name: "",
    menuIds: [] as number[],
    isRequired: checked,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const validMenusByLocation = menuByLocationId(
    menusMenuCategoriesLocations,
    menus
  ) as Menus[];

  const validMenuIds = validMenusByLocation.map((item) => item.id) as number[];
  const defaultMenu = validMenusByLocation[0];

  const createAddonCategory = async () => {
    const response = await fetch(`${config.apiBaseUrl}/addonCategories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addonCategory),
    });
    const responseData = await response.json();
    dispatch(addAddonCategory(responseData));
    dispatch(fetchMenusAddonCategories(validMenuIds));
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onClose={() => setOpen && setOpen(false)}
      sx={{ minWidth: 500 }}
    >
      <DialogTitle>Create New Addon Category</DialogTitle>
      <DialogContent>
        <form onSubmit={createAddonCategory}>
          <TextField
            placeholder="Name"
            variant="outlined"
            fullWidth
            onChange={(evt) => {
              setAddonCategory({
                ...addonCategory,
                name: evt.target.value,
              });
            }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label="Required"
          ></FormControlLabel>
          <AutocompleteComponent
            label="Menus"
            options={validMenusByLocation}
            defaultValue={[defaultMenu]}
            onChange={(options) => {
              setAddonCategory({
                ...addonCategory,
                menuIds: options.map((item) => item.id as number),
              });
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              size="small"
              onClick={createAddonCategory}
            >
              Create
            </Button>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAddonCategory;
