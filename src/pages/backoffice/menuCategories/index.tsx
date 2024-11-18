import React, { useContext, useState } from "react";
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
import { getSelectedLocationId, menuCategoryByLocationId } from "@/utils";
import Link from "next/link";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const MenuCategories = () => {
  const { menuCategories, menusMenuCategoriesLocations } =
    useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();
  const [open, setOpen] = useState(false);
  const [menuCategory, setMenuCategory] = useState("");
  const [checked, setChecked] = useState(true);

  const validMenuCategories = menuCategoryByLocationId(
    menusMenuCategoriesLocations,
    menuCategories
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const createMenuCategory = async () => {
    await fetch(`${config.apiBaseUrl}/menu-categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer`,
      },
      body: JSON.stringify({
        name: menuCategory,
        locationId: selectedLocationId,
        isAvailable: checked,
      }),
    });
    fetchData();
    setOpen(false);
  };

  if (!validMenuCategories.length) {
    return (
      <Layout title="Menu Categories">
        <Box sx={{ m: 5 }}>Error: 404 menu category not available!</Box>
      </Layout>
    );
  }

  return (
    <Layout title="Menu Categories">
      <Box sx={{ mx: 2, mt: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new category
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            columnGap: 2,
            flexWrap: "wrap",
            mx: 2,
            mt: 2,
          }}
        >
          {validMenuCategories.map((item) => (
            <Link
              href={`/backoffice/menuCategories/${item.id}`}
              key={item.id}
              style={{ textDecoration: "none" }}
            >
              <DemoPaper
                square={false}
                elevation={5}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Typography variant="body2" sx={{ mt: 10 }}>
                  {item.name}
                </Typography>
              </DemoPaper>
            </Link>
          ))}
        </Box>

        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>Create New Menu Category</DialogTitle>
          <DialogContent>
            <form onSubmit={createMenuCategory}>
              <TextField
                placeholder="Name"
                variant="outlined"
                fullWidth
                onChange={(evt) => {
                  setMenuCategory(evt.target.value);
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
      </Box>
    </Layout>
  );
};

export default MenuCategories;
