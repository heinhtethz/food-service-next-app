import AutocompleteComponent from "@/component/Autocomplete";
import FileDropZone from "@/component/FileDropZone";
import Layout from "@/component/Layout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocations";
import { updateMenu } from "@/store/slices/menusSlice";
import {
  getSelectedLocationId,
  menuByLocationId,
  menuCategoryByLocationId,
  menusMenuCategoriesLocationsByLocationId,
} from "@/utils";
import { Box, Button, Chip, TextField } from "@mui/material";
import { AddonCategories, Menus } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";

const EditMenu = () => {
  const { menuCategories, menusMenuCategoriesLocations, menus } =
    useAppSelector(appData);
  const dispatch = useAppDispatch();
  const locationId = getSelectedLocationId() as string;
  const router = useRouter();
  const id = router.query.id as string;
  const menuId = Number(id);
  const menu = menus.find((item) => item.id === menuId) as Menus;
  const defaultMenu = menuByLocationId(
    menusMenuCategoriesLocations,
    menus
  ).find((item) => item.id === menuId) as Menus;

  const [selectedMenuCategory, setSelectedMenuCateogry] = useState({
    id: [] as Number[],
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [editMenu, setEditMenu] = useState<Partial<Menus>>();

  const validMenuCategory = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  ).map((item) => ({ id: item.id, name: item.name }));

  const menusMenuCategoriesLocationsByLocation =
    menusMenuCategoriesLocationsByLocationId(menusMenuCategoriesLocations);
  const defaultMenuCategoryId = menusMenuCategoriesLocationsByLocation
    .filter((item) => item.menuId === menuId)
    .map((item) => item.menuCategoryId);
  const defaultMenuCategory = menuCategories
    .filter((item) => defaultMenuCategoryId.includes(item.id))
    .map((item) => ({ id: item.id, name: item.name }));

  const onFileSelected = (acceptedFiles: File[]) => {
    setSelectedFiles(acceptedFiles);
  };

  const handleUpdateMenu = async () => {
    const isValid =
      editMenu?.name ||
      editMenu?.price ||
      editMenu?.description ||
      editMenu?.assetUrl ||
      selectedMenuCategory.id.length;
    if (!isValid) return alert("please fill at least one of these fields");

    !editMenu?.name && setEditMenu({ name: defaultMenu?.name });
    !editMenu?.price && setEditMenu({ price: defaultMenu?.price });
    !editMenu?.description &&
      setEditMenu({ description: defaultMenu?.description });
    !editMenu?.assetUrl && setEditMenu({ assetUrl: defaultMenu?.assetUrl });

    const response = await fetch(`${config.apiBaseUrl}/menus`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...editMenu,
        menuId: menu.id,
        menuCategoryId: selectedMenuCategory.id,
        locationId,
      }),
    });
    const responseData = await response.json();
    dispatch(updateMenu(responseData));
    dispatch(fetchMenusMenuCategoriesLocations(locationId));
  };

  return (
    <Layout title="Edit Menu">
      <Box
        sx={{
          width: 400,
          display: "flex",
          flexDirection: "column",
          margin: "0 auto",
          mt: 2,
          gap: 2,
        }}
      >
        <TextField
          label="Name"
          defaultValue={defaultMenu?.name}
          onChange={(evt) => {
            setEditMenu({ ...editMenu, name: evt.target.value });
          }}
          fullWidth
        ></TextField>
        <TextField
          label="Price"
          type="number"
          defaultValue={defaultMenu?.price}
          onChange={(evt) =>
            setEditMenu({ ...editMenu, price: Number(evt.target.value) })
          }
          fullWidth
        ></TextField>
        <TextField
          label="Description"
          defaultValue={defaultMenu?.description}
          onChange={(evt) =>
            setEditMenu({ ...editMenu, description: evt.target.value })
          }
          fullWidth
        ></TextField>
        <AutocompleteComponent
          options={validMenuCategory}
          defaultValue={defaultMenuCategory}
          label="Menu Category"
          onChange={(options) => {
            setSelectedMenuCateogry({
              ...selectedMenuCategory,
              id: options.map((item) => item.id),
            });
          }}
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
        <Box sx={{ margin: "0 auto" }}>
          <Button variant="contained" onClick={handleUpdateMenu}>
            Update
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default EditMenu;