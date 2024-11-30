import AutocompleteComponent from "@/component/Autocomplete";
import FileDropZone from "@/component/FileDropZone";
import Layout from "@/component/Layout";
import { config } from "@/config/config";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { fetchMenusMenuCategoriesLocations } from "@/store/slices/menusMenuCategoriesLocations";
import { removeMenu, updateMenu } from "@/store/slices/menusSlice";
import {
  getSelectedLocationId,
  menuByLocationId,
  menuCategoryByLocationId,
  menusMenuCategoriesLocationsByLocationId,
} from "@/utils";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Menus } from "@prisma/client";
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

  const [selectedMenuCategory, setSelectedMenuCateogry] = useState(
    [] as Number[]
  );

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const [editMenu, setEditMenu] = useState<Partial<Menus>>();
  const [open, setOpen] = useState<boolean>(false);

  const validMenuCategory = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  ).map((item) => ({ id: item.id, name: item.name }));

  const menusMenuCategoriesLocationsByLocation =
    menusMenuCategoriesLocationsByLocationId(menusMenuCategoriesLocations);

  const defaultMenuCategoryId = menusMenuCategoriesLocationsByLocation
    .filter((item) => item.menuId === menuId && item.isArchived === false)
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
      selectedMenuCategory.length;
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
        menuCategoryId: selectedMenuCategory,
        locationId,
      }),
    });
    const responseData = await response.json();
    dispatch(updateMenu(responseData));
    dispatch(fetchMenusMenuCategoriesLocations(locationId));
  };

  const handleDeleteMenu = async () => {
    const response = await fetch(
      `${config.apiBaseUrl}/menus?id=${id}&locationId=${locationId}`,
      {
        method: "DELETE",
      }
    );
    dispatch(removeMenu(menu));
    setOpen(false);
    if (response.ok) {
      router.push("/backoffice/menus");
    }
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
            setSelectedMenuCateogry(options.map((item) => item.id));
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="contained" onClick={handleUpdateMenu}>
            Update
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={() => setOpen(true)}
          >
            Delete
          </Button>
        </Box>
        <Dialog open={open}>
          <DialogContent>
            <Typography variant="h6">
              Are you sure to delete this menu?
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
                handleDeleteMenu();
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

export default EditMenu;
