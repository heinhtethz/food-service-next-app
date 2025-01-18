import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import Link from "next/link";
import { addTable } from "@/store/slices/tablesSlice";
import CreateTable from "./CreateTables";

const Tables = () => {
  const { tables } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();
  const [open, setOpen] = useState(false);

  const validTables = tables.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );

  return (
    <Layout title="Tables">
      <Box sx={{ px: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              setOpen(true);
            }}
          >
            new tables
          </Button>
        </Box>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {validTables.length ? (
            validTables.map((validTable) => {
              return (
                <Link
                  href={`/backoffice/tables/${validTable.id}`}
                  key={validTable.name}
                  style={{ textDecoration: "none" }}
                >
                  <Card sx={{ width: 250, mr: 2, borderRadius: 2 }}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="140"
                        image="https://cdnimg.webstaurantstore.com/uploads/seo_category/2019/5/table-dining-sets.jpg"
                        alt="green iguana"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          {validTable.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant="inherit"
                          component="div"
                        ></Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Link>
              );
            })
          ) : (
            <h1>No available table!</h1>
          )}
        </Box>
        <CreateTable open={open} setOpen={setOpen} />
      </Box>
    </Layout>
  );
};

export default Tables;
