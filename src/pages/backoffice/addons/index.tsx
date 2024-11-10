import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { Button, styled, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { addonByLocationId } from "@/utils";
import Layout from "@/component/Layout";
import CreateNewAddons from "./CreateAddons";
import Link from "next/link";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

const Addons = () => {
  const {
    addons,
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menusAddonCategories,
  } = useAppSelector(appData);
  const [open, setOpen] = useState(false);

  const validAddons = addonByLocationId(
    addonCategories,
    menus,
    menusMenuCategoriesLocations,
    menusAddonCategories,
    addons
  );

  // if (!validAddons.length) {
  //   return null;
  // }
  return (
    <Layout title="Addons">
      <Box sx={{ mx: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
          >
            Create new addon
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
          {validAddons.map((item) => (
            <Link href={`/editAddon/${item.id}`} key={item.id}>
              <DemoPaper square={false} elevation={5}>
                <Typography variant="body2" sx={{ mt: 10 }}>
                  {item.name}
                </Typography>
              </DemoPaper>
            </Link>
          ))}
        </Box>
        <CreateNewAddons open={open} setOpen={setOpen} />
      </Box>
    </Layout>
  );
};

export default Addons;
