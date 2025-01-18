import { Box, Button, Chip, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { getSelectedLocationId, menuCategoryByLocationId } from "@/utils";
import { config } from "@/config/config";
import FileDropZone from "@/component/FileDropZone";
import AutocompleteComponent from "@/component/Autocomplete";
import { addMenu } from "@/store/slices/menusSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocations";

interface Prop {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewMenus = ({ setOpen }: Prop) => {
  const { menusMenuCategoriesLocations, menuCategories } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const locationId = getSelectedLocationId() as string;
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newMenu, setNewMenu] = useState({
    name: "",
    price: 0,
    description: "",
    assetUrl:
      "https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg",
    menuCategoryId: [] as Number[],
    locationId: Number(locationId),
  });

  const validMenuCategory = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  const onFileSelected = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const createNewMenu = async () => {
    const isValid = newMenu.name && newMenu.menuCategoryId.length;
    if (!isValid) return alert("Name or menu category required");
    if (selectedFiles.length) {
      const formData = new FormData();
      formData.append("files", selectedFiles[0]);
      const response = await fetch(`${config.apiBaseUrl}/assets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer`,
          "Content-Type": "application/json",
        },
        body: formData,
      });
      const responseData = await response.json();
      newMenu.assetUrl = responseData.assetUrl;
    }
    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    const newMenuData = await response.json();
    dispatch(addMenu(newMenuData));
    dispatch(fetchMenusMenuCategoriesLocations(locationId));
    setOpen(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center ",
        minWidth: 250,
        mx: 2,
      }}
    >
      <TextField
        variant="outlined"
        label="Name"
        sx={{ mb: 2, width: "100%" }}
        fullWidth
        onChange={(evt) => {
          setNewMenu({ ...newMenu, name: evt.target.value });
        }}
      />
      <TextField
        variant="outlined"
        label="Price"
        type="number"
        sx={{ mb: 2, width: "100%" }}
        onChange={(evt) => {
          setNewMenu({ ...newMenu, price: Number(evt.target.value) });
        }}
      />
      <TextField
        variant="outlined"
        label="Description"
        sx={{ width: "100%" }}
        onChange={(evt) => {
          setNewMenu({ ...newMenu, description: evt.target.value });
        }}
      />
      <AutocompleteComponent
        label="Menu Category"
        options={validMenuCategory}
        onChange={(option) =>
          setNewMenu({
            ...newMenu,
            menuCategoryId: option.map((item) => item.id),
          })
        }
      />
      <Box sx={{ mt: 2, mb: 3, width: "100%" }}>
        <FileDropZone onFileSelected={onFileSelected} />
        {selectedFiles.map((selectedFile) => {
          return (
            <Chip
              key={selectedFile.name}
              label={selectedFile.name}
              onDelete={() => {
                setSelectedFiles(
                  selectedFiles.filter(
                    (file) => file.name !== selectedFile.name
                  )
                );
              }}
              sx={{ mt: 1 }}
            />
          );
        })}
      </Box>
      <Button variant="contained" onClick={createNewMenu}>
        Create
      </Button>
    </Box>
  );
};

export default CreateNewMenus;
