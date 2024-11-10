import { Box, Button, Chip, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { getSelectedLocationId, menuCategoryByLocationId } from "@/utils";
import { config } from "@/config/config";
import FileDropZone from "@/component/FileDropZone";
import AutocompleteComponent from "@/component/Autocomplete";

interface Prop {
  setOpen?: any;
}

const CreateMenus = ({ setOpen }: Prop) => {
  const { menusMenuCategoriesLocations, menuCategories } =
    useAppSelector(appData);
  const locationId = getSelectedLocationId();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [newMenu, setNewMenu] = useState({
    name: "",
    price: 0,
    description: "",
    assetUrl:
      "https://www.simplyrecipes.com/thmb/KE6iMblr3R2Db6oE8HdyVsFSj2A=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2019__09__easy-pepperoni-pizza-lead-3-1024x682-583b275444104ef189d693a64df625da.jpg",
    menu_categories_id: [] as Number[],
    locations_id: Number(locationId),
  });

  const validMenuCategory = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  const onFileSelected = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const createNewMenu = async () => {
    const isValid =
      newMenu.name && newMenu.description && newMenu.menu_categories_id.length;
    if (!isValid) return alert("Name or description or menu category required");
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
    await fetch(`${config.apiBaseUrl}/menus`, {
      method: "POST",
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenu),
    });
    fetchData();
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
            menu_categories_id: option.map((item) => item.id),
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

export default CreateMenus;
