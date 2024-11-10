import React, { useContext, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { appData, fetchData } from "@/store/slices/appSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { config } from "@/config/config";
import Layout from "@/component/Layout";

const Locations = () => {
  const { locations, company } = useAppSelector(appData);
  const [createData, setCreateData] = useState({
    name: "",
    address: "",
    companyId: company?.id,
  });
  const [data, setData] = useState({
    id: 0,
    name: "",
    address: "",
    companyId: company?.id,
  });

  const createLocation = async () => {
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "POST",
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createData),
    });
    fetchData();
  };

  const updateLocation = async () => {
    const response = await fetch(`${config.apiBaseUrl}/locations`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    fetchData();
    console.log(data);
  };

  return (
    <Layout title="Locations">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Box sx={{ ml: 4.5 }}>
          <TextField
            sx={{ mr: 5 }}
            label="Name"
            variant="outlined"
            onChange={(evt) => {
              setCreateData({
                ...createData,
                name: evt.target.value,
                companyId: company?.id,
              });
            }}
          />
          <TextField
            sx={{ mr: 5 }}
            label="Address"
            variant="outlined"
            onChange={(evt) => {
              setCreateData({
                ...createData,
                address: evt.target.value,
                companyId: company?.id,
              });
            }}
          />
          <Button variant="contained" sx={{ mt: 1 }} onClick={createLocation}>
            Create
          </Button>
        </Box>
        <Box>
          {locations.map((location, index) => {
            return (
              <Box
                key={location.name}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 5,
                }}
              >
                <Typography variant="h5" sx={{ mr: 2, mt: 1 }}>
                  {index + 1}.
                </Typography>
                <TextField
                  sx={{ mr: 5 }}
                  label="Name"
                  variant="outlined"
                  defaultValue={location.name}
                  onChange={(evt) => {
                    setData({
                      ...data,
                      //@ts-ignore
                      id: location.id,
                      name: evt.target.value,
                      companyId: company?.id,
                    });
                  }}
                />
                <TextField
                  sx={{ mr: 5 }}
                  label="Address"
                  variant="outlined"
                  defaultValue={location.address}
                  onChange={(evt) => {
                    setData({
                      ...data,
                      //@ts-ignore
                      id: location.id,
                      address: evt.target.value,
                      companyId: company?.id,
                    });
                  }}
                />
                <Box>
                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={updateLocation}
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Layout>
  );
};

export default Locations;
