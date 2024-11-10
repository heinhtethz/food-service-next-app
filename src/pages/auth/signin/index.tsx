import Layout from "@/component/Layout";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignIn = () => {
  return (
    <Layout title="Sign In">
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
    </Layout>
  );
};

export default SignIn;