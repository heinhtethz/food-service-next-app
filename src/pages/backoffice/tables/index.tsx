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
import { useContext, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { appData, fetchData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import { config } from "@/config/config";
import Layout from "@/component/Layout";

const Tables = () => {
  const { tables } = useAppSelector(appData);
  const selectedLocationId = getSelectedLocationId();
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState("");
  const validTables = tables.filter(
    (item) => item.locationId === Number(selectedLocationId)
  );

  const createNewTable = async () => {
    await fetch(`${config.apiBaseUrl}/tables`, {
      method: "POST",
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newTable, locationId: selectedLocationId }),
    });
    fetchData();
    setOpen(false);
  };

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
                <Card
                  key={validTable.name}
                  sx={{ width: 250, mr: 2, borderRadius: 2 }}
                >
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
              );
            })
          ) : (
            <h1>No table not available!</h1>
          )}
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle sx={{ textAlign: "center" }}>
            Create New Table
          </DialogTitle>
          <DialogContent sx={{ width: 400 }}>
            <form onSubmit={createNewTable}>
              <TextField
                placeholder="Table name"
                fullWidth
                onChange={(evt) => {
                  setNewTable(evt.target.value);
                }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" onClick={createNewTable}>
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

export default Tables;