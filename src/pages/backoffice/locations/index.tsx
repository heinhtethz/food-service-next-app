import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { appData } from "@/store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { config } from "@/config/config";
import Layout from "@/component/Layout";
import { Locations } from "@prisma/client";
import AddIcon from "@mui/icons-material/Add";
import {
  addLocation,
  removeLocation,
  updateLocation,
} from "@/store/slices/locationsSlice";

const Location = () => {
  const { locations, company } = useAppSelector(appData);
  const dispatch = useAppDispatch();
  const [newLocation, setNewLocation] = useState<Partial<Locations>>();
  const [editLocation, setEditLocation] = useState<Partial<Locations>>();
  const [open, setOpen] = useState(false);

  const handleCreateLocation = async () => {
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newLocation),
    });
    const responseData = await response.json();
    dispatch(addLocation(responseData));
    setOpen(false);
  };

  const handleUpdateLocation = async () => {
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editLocation),
    });
    const responseData = await response.json();
    dispatch(updateLocation(responseData));
  };

  const handleDeleteLocation = async (prop: number) => {
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: prop }),
    });
    const responseData = await response.json();
    dispatch(removeLocation(responseData));
  };

  return (
    <Layout title="Locations">
      <Box sx={{ display: "flex", justifyContent: "flex-end", mx: 2, mt: 2 }}>
        <Button
          variant="contained"
          startIcon={<AddIcon></AddIcon>}
          onClick={() => setOpen(true)}
        >
          Create New Location
        </Button>
      </Box>
      <Box sx={{ maxWidth: 800, margin: "0 auto" }}>
        <Box>
          {locations.map((location, index) => {
            return (
              <Box
                key={location.name}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  mt: 3,
                }}
              >
                <Typography variant="h5">{index + 1}.</Typography>
                <Box
                  sx={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <TextField
                    label="Name"
                    variant="outlined"
                    defaultValue={location.name}
                    onChange={(evt) => {
                      setEditLocation({
                        ...editLocation,
                        id: location.id,
                        name: evt.target.value,
                        companyId: company?.id,
                      });
                    }}
                  />
                  <TextField
                    label="Address"
                    variant="outlined"
                    defaultValue={location.address}
                    onChange={(evt) => {
                      setEditLocation({
                        ...editLocation,
                        id: location.id,
                        address: evt.target.value,
                        companyId: company?.id,
                      });
                    }}
                  />
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={handleUpdateLocation}
                  >
                    Update
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 1, ml: 1 }}
                    onClick={() => handleDeleteLocation(location.id)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontFamily: "monospace" }}>
            Create New Location
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            variant="outlined"
            onChange={(evt) => {
              setNewLocation({
                ...newLocation,
                name: evt.target.value,
                companyId: company?.id,
              });
            }}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Address"
            variant="outlined"
            onChange={(evt) => {
              setNewLocation({
                ...newLocation,
                address: evt.target.value,
                companyId: company?.id,
              });
            }}
            sx={{ mb: 2 }}
            fullWidth
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="contained"
              onClick={handleCreateLocation}
              sx={{ mt: 1 }}
            >
              Create
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Location;
