import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const BackofficeApp = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const createNewUser = async () => {
    const valid = user.name && user.email;
    if (!valid) alert("Name and email are required");
    const response = await fetch("http://localhost:3000/api/backoffice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    console.log(response);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
        rowGap: 2,
      }}
    >
      <TextField
        variant="outlined"
        label="Name"
        onChange={(evt) => setUser({ ...user, name: evt.target.value })}
      />
      <TextField
        variant="outlined"
        label="Email"
        onChange={(evt) => setUser({ ...user, email: evt.target.value })}
      />
      <Button variant="contained" onClick={createNewUser}>
        Create New User
      </Button>
    </Box>
  );
};

export default BackofficeApp;
