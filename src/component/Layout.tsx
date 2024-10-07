import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { signIn, signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const { data } = useSession();
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Food Service
          </Typography>
          {data ? (
            <Button
              color="inherit"
              onClick={() => {
                signOut({ callbackUrl: "/auth/signin" });
              }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => signIn("google", { callbackUrl: "/auth/signin" })}
            >
              Log In
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default Layout;
