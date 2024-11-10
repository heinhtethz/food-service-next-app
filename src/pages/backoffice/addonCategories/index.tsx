import React, { useContext, useState } from "react";
import { addonCategoryByLocationId, menuByLocationId } from "@/utils";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import { useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import AutocompleteComponent from "@/component/Autocomplete";
import Link from "next/link";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const AddonCategories = () => {
  const {
    menus,
    menusMenuCategoriesLocations,
    addonCategories,
    menusAddonCategories,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [addonCategory, setAddonCategory] = useState({
    name: "",
    menuIds: [] as number[],
    isRequired: checked,
  });

  const validAddonCategories = addonCategoryByLocationId(
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menusAddonCategories
  );

  const validMenusByLocation = menuByLocationId(
    menusMenuCategoriesLocations,
    menus
  ).map((item) => ({ id: item.id, name: item.name }));

  const defaultMenu = validMenusByLocation[0];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const createAddonCategory = async () => {
    await fetch(`${config.apiBaseUrl}/addon-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify(addonCategory),
    });

    fetchData();

    setOpen(false);
  };
  return (
    <Layout title="Addon Categories">
      <Box sx={{ mx: 2, mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new addon category
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "& > :not(style)": {
              m: 1,
              width: 128,
              height: 128,
            },
            gap: 3,
          }}
        >
          {validAddonCategories.map((item) => (
            <Link
              href={`/backoffice/addonCategories/EditAddonCategory/${item.id}`}
              onChange={() => console.log(item.id)}
              key={item.id}
            >
              <DemoPaper square={false} elevation={5}>
                <Typography variant="body2" sx={{ mt: 10 }}>
                  {item.name}
                </Typography>
              </DemoPaper>
            </Link>
          ))}
        </Box>
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
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
                  const validMenuIds = options.map((item) => item.id as number);
                  setAddonCategory({
                    ...addonCategory,
                    menuIds: validMenuIds,
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
      </Box>
    </Layout>
  );
};

export default AddonCategories;
