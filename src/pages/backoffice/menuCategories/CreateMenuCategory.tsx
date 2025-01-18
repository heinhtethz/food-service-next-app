import { config } from "@/config/config";
import { useAppDispatch } from "@/store/hooks";
import { addMenuCategory } from "@/store/slices/menuCategoriesSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocations";
import { getSelectedLocationId } from "@/utils";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateMenuCategory = ({ open, setOpen }: Props) => {
  const [menuCategoryName, setMenuCategoryName] = useState("");
  const selectedLocationId = getSelectedLocationId() as string;
  const dispatch = useAppDispatch();

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
  );
};

export default CreateMenuCategory;
