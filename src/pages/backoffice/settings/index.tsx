import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext, useEffect, useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { appData } from "@/store/slices/appSlice";
import { getSelectedLocationId } from "@/utils";
import Layout from "@/component/Layout";

const Settings = () => {
  const { locations } = useAppSelector(appData);
  const locationIdFromLocalStorage = getSelectedLocationId();
  const [selectedLocationId, setSelectedLocationId] = useState("");

  useEffect(() => {
    if (locations.length) {
      if (locationIdFromLocalStorage) {
        setSelectedLocationId(locationIdFromLocalStorage);
      } else {
        const firstLocationId = String(locations[0].id);
        setSelectedLocationId(firstLocationId);
        if (typeof window !== "undefined" && window.localStorage) {
          localStorage.setItem("selectedLocationId", firstLocationId);
        }
      }
    }
  }, [locations]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedLocationId(event.target.value as string);
    localStorage.setItem("selectedLocationId", event.target.value);
  };

  return (
    <Layout title="Settings">
      <Box sx={{ maxWidth: 300, ml: 5, mt: 5 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedLocationId}
            label="Location"
            onChange={handleChange}
          >
            {locations.map((location) => {
              return (
                <MenuItem key={location.id} value={location.id}>
                  {location.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
    </Layout>
  );
};

export default Settings;
