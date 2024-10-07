import Layout from "@/component/Layout";
import { config } from "@/config/config";
import { Box, Button, TextField } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BackofficeApp = () => {
  const { data, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const createNewUser = async () => {
    const valid = user.name && user.email;
    if (!valid) alert("Name and email are required");
    const response = await fetch(`${config.apiBaseUrl}/backoffice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data !== 200) {
      alert("User already exists");
    }
  };

  useEffect(() => {
    if (!data && status !== "loading") {
      router.push("auth/signin");
    }
  }, [data]);

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
