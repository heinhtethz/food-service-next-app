import Layout from "@/component/Layout";
import WelcomePageTopBar from "@/component/welcomePageTopBar";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Box>
      <WelcomePageTopBar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 20,
        }}
      >
        <Button
          variant="contained"
          onClick={() => {
            signIn("google", { callbackUrl: "/backoffice" });
          }}
        >
          Sign In
        </Button>
      </Box>
    </Box>
  );
};

export default SignIn;
