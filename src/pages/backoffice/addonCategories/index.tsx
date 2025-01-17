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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import Layout from "@/component/Layout";
import Link from "next/link";
import CreateAddonCategory from "./CreateAddonCategory";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const AddonCategories = () => {
  const dispatch = useAppDispatch();
  const {
    menus,
    menusMenuCategoriesLocations,
    addonCategories,
    menusAddonCategories,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);

  const validAddonCategories = addonCategoryByLocationId(
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menusAddonCategories
  );

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
            gap: 3,
          }}
        >
          {validAddonCategories.length ? (
            validAddonCategories.map((item) => (
              <Link
                href={`/backoffice/addonCategories/${item.id}`}
                onChange={() => console.log(item.id)}
                key={item.id}
                style={{ textDecoration: "none" }}
              >
                <DemoPaper square={false} elevation={5}>
                  <Typography variant="body2" sx={{ mt: 10 }}>
                    {item.name}
                  </Typography>
                </DemoPaper>
              </Link>
            ))
          ) : (
            <h1>No available addon category!</h1>
          )}
        </Box>
        <CreateAddonCategory open={open} setOpen={setOpen} />
      </Box>
    </Layout>
  );
};

export default AddonCategories;
